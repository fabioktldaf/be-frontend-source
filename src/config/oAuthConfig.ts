export const authorizationServers = [
  {
    value: "0",
    label: "Github",
    config: {
      url: "https://github.com/login/oauth/authorize",
      client_id: "8535d7fa6c46cff320d8",
      client_secret: "9493ae1a475178991de5d4380fba743991ba38b6",
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
      clientId: "634934568956-vip3huvgisug23jkv4cl9vdh33o32bec.apps.googleusercontent.com",
      secret: "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",
      redirectUri: "",
      scope: "",
    },
  },
];
