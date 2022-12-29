import { graphConfig } from "../config/authConfig";

export async function callMsGraph(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  try {
    const response = await fetch(graphConfig.graphMeEndpoint, {
      method: "GET",
      headers,
    });

    return await response.json();
  } catch (err: any) {
    console.log(err);
  }
}
