import React, { useState } from "react";
import { Layout } from "antd";
import LanguageSelect from "./LaguageSelect";

import styled from "styled-components";
import { ButtonConfirm } from "./Buttons";
import { SelectStyled } from "../../style/Input";
import { authorizationServers } from "../../config/oAuthConfig";

const Login = () => {
  const [authorizationServer, setAuthorizationServer] = useState(authorizationServers[0]);

  const handleLogin = () => {
    const { url, client_id, client_secret, redirect_uri } = authorizationServer.config;
    const oAuthUrl = `${url}?client_id=${client_id}&client_secret=${client_secret}`;
    console.log("oAuthUrl ", oAuthUrl);
    window.location.replace(oAuthUrl);
  };

  const handleSetAuthorizationServer = (id: string) => {
    setAuthorizationServer(authorizationServers.find((s) => s.value == id)!);
  };

  return (
    <div style={{ display: "flex" }}>
      <SelectStyled
        onChange={(val) => handleSetAuthorizationServer(val)}
        options={authorizationServers}
        defaultValue={authorizationServers[0].value}
      />
      <ButtonConfirm onClick={handleLogin} style={{ marginLeft: "1em" }}>
        Login
      </ButtonConfirm>
    </div>
  );
};

export default Login;
