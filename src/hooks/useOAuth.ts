import { useCallback, useRef, useState } from "react";
import { setPolicyData } from "../redux/features/newClaimSlice";

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = "react-use-oauth2-response";

const generateState = () => {
  const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map((x: number) => validChars.codePointAt(x % validChars.length)!);
  const randomState = String.fromCharCode.apply(null, Array.from(array));
  return randomState;
};

const saveState = (state: string) => {
  sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const openPopup = (url: string) => {
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;

  return window.open(url, "OAuth Popup", `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`);
};

const closePopup = (popupRef: any) => {
  popupRef.current?.close();
};

const cleanup = (intervalRef: any, popupRef: any, handleMessageListener: any) => {
  clearInterval(intervalRef.current);
  closePopup(popupRef), removeState();
  window.removeEventListener("message", handleMessageListener);
};

const enhanceAuthorizeUrl = (
  authorizeUrl: string,
  clientId: string,
  redirectUri: string,
  scope: string,
  state: string
) => {
  return `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
};

const objectToQuery = (object: any) => {
  return new URLSearchParams(object).toString();
};

const formatExchangeCodeForTokenServerUrl = (
  serverUrl: string,
  clientId: string,
  code: string,
  redirectUri: string
) => {
  return `${serverUrl}?${objectToQuery({
    client_id: clientId,
    code,
    redirect_uri: redirectUri,
  })}`;
};

const useOAuth = (props: any) => {
  const { authorizeUrl, clientId, redirectUri, scope = "" } = props;

  const popupRef = useRef<Window | null>();
  const intervalRef = useRef<NodeJS.Timer>();
  const [data, setData] = useState({});
  const [ui, setUI] = useState<{ loading: boolean; error: string | undefined }>({ loading: false, error: undefined });
  const { loading, error } = ui;

  const getAuth = useCallback(() => {
    setUI({
      loading: true,
      error: undefined,
    });

    const state = generateState();
    saveState(state);

    popupRef.current = openPopup(enhanceAuthorizeUrl(authorizeUrl, clientId, redirectUri, scope, state));

    async function handleMessageListener(message: any) {
      try {
        const type = message?.data?.type;
        if (type === OAUTH_RESPONSE) {
          const errorMaybe = message?.data?.error;
          if (errorMaybe) {
            setUI({
              loading: false,
              error: errorMaybe || "Unknown Error",
            });
          } else {
            const code = message?.data?.payload?.code;
            const response = await fetch(
              formatExchangeCodeForTokenServerUrl(
                "http://127.0.0.1:5001/be-api-514bf/us-central1/token",
                clientId,
                code,
                redirectUri
              )
            );

            if (!response.ok) {
              setUI({
                loading: false,
                error: "Failed to exchange code for token",
              });
            } else {
              const payload = await response.json();
              setUI({
                loading: false,
                error: undefined,
              });
              setData(payload);
              console.log("final data ", payload);
            }
          }
        }
      } catch (genericError: any) {
        console.log(genericError);
        setUI({
          loading: false,
          error: genericError.toString(),
        });
      } finally {
        cleanup(intervalRef, popupRef, handleMessageListener);
      }
    }

    window.addEventListener("message", handleMessageListener);

    intervalRef.current = setInterval(() => {
      const popupClosed = !popupRef?.current?.window?.closed;
      if (popupClosed) {
        setUI({
          ...ui,
          loading: false,
        });

        console.warn("Warning: Popup was closed before completing authentication");
        clearInterval(intervalRef.current);
        removeState();
        window.removeEventListener("message", handleMessageListener);
      }
    }, 250);

    return () => {
      window.removeEventListener("message", handleMessageListener);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // props ???
};
