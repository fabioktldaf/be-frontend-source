import React, { useState, useEffect } from "react";
import { callMsGraph } from "../../utils/graph";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { AuthenticationResult } from "@azure/msal-browser";

const AzureAD = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState<any>();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        await requestProfileData();
      })();
    } else setGraphData(undefined);
  }, [isAuthenticated]);

  const account = accounts[0];

  const requestProfileData = async () => {
    const request = { ...loginRequest, account };

    let resp: AuthenticationResult | undefined;

    try {
      resp = await instance.acquireTokenSilent(request);
    } catch (err) {
      resp = await instance.acquireTokenPopup(request);
    }

    if (!resp) return;
    const data = await callMsGraph(resp.accessToken);
    if (data) {
      setGraphData(data);
    }
  };

  console.log("graphData ", graphData);
  return (
    <div>
      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ marginRight: "1em" }}
          >{`${graphData?.displayName} / ${graphData?.givenName} ${graphData?.surname} `}</div>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

export default AzureAD;
