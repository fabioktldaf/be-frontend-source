import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import { Button } from "antd";

const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <Button type="primary" size="small" onClick={() => instance.loginPopup(loginRequest)}>
      Login
    </Button>
  );
};

export default SignInButton;
