export const authorizationServers = [
  {
    value: "0",
    label: "Github",
    config: {
      url: "https://github.com/login/oauth/authorize",
      client_id: "",
      client_secret: "",
      redirect_uri: "http://localhost:3000",
      login: "",
      scope: "",
      state: "",
      allow_signup: false,
      backendUrl: "http://127.0.0.1:5001/be-api-514bf/us-central1/authorized",
      callback: "http://localhost:3000/authorized",
    },
  },
  {
    value: "1",
    label: "Google",
    config: {
      authorizeUrl: "",
      clientId: "",
      secret: "",
      redirectUri: "",
      scope: "",
    },
  },
];
