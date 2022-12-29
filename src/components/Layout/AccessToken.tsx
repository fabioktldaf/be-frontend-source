import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "antd";

const AccessToken = () => {
  const navigate = useNavigate();
  const { server } = useParams();
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<any>({});

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const scope = searchParams.get("scope");
    const token_type = searchParams.get("token_type");

    setState({
      access_token,
      scope,
      token_type,
    });
  }, [server]);

  return (
    <div style={{ display: "flex" }}>
      <p>Access Token: {state.access_token}</p>
      <p>Scope: {state.scope}</p>
      <p>Token Type: {state.token_type}</p>
    </div>
  );
};

export default AccessToken;
