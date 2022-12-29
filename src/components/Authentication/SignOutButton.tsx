import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from "antd";
import { EndSessionPopupRequest } from "@azure/msal-browser";

const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        instance.logoutPopup({
          postLogoutRedirect: "/",
          mainWindowRedirectUri: "/",
        } as EndSessionPopupRequest);
      }}
    >
      Logout
    </Button>
  );
};

export default SignOutButton;
