export const msalConfig = {
  auth: {
    clientId: "d101ed20-77ed-4445-8e29-c24e0fee2272",
    authority: "https://login.microsoftonline.com/35bd1325-af2b-43f0-a106-3efdcfed0b07",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
