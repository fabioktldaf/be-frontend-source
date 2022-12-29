import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "antd";
import { authorizationServers } from "../../config/oAuthConfig";

const Authorized = () => {
  const navigate = useNavigate();
  const { server } = useParams();
  const [searchParams] = useSearchParams();
  const [githubCode, setGithubCode] = useState<string | undefined>();
  const [serverConfig, setServerConfig] = useState<any>();

  useEffect(() => {
    const config = authorizationServers.find((s) => s.label.toLowerCase() === server?.toLowerCase())!.config;
    const { backendUrl, client_id, client_secret } = config;

    setServerConfig(config);

    const code = searchParams.get("code");
    const urlCode = `${backendUrl}?code=${code}&server=${server}`;
    console.log("authorized url: ", urlCode);

    fetch(urlCode)
      .then((result) => result.json())
      .then((data) => {
        console.log("data ", data);
        if (data?.result?.code) {
          setGithubCode(data?.result?.code);
        }
      });
  }, [server]);

  return (
    <>
      <div style={{ display: "flex" }}>You are Authorized</div>;
      {githubCode && serverConfig && (
        <form action="https://github.com/login/oauth/access_token" method="POST">
          <input name="client_id" value={serverConfig.client_id} />
          <input name="client_secret" value={serverConfig.client_secret} />
          <input name="code" value={githubCode} />
          <input name="redirect_uri" value={serverConfig.callback + "/github"} />
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default Authorized;
