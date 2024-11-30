import { refreshToken } from "./auth";
import fetchWrapper from "./custom-fetch";
import { getSession } from "./session";

interface FetchOptions extends RequestInit {
  headers: Record<string, string>;
}

export async function authFetch(url: string | URL, options: FetchOptions) {
  const session = await getSession();

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  let res = await fetchWrapper(url, options);
  if (res.status === 401) {
    if (!session?.refreshToken) throw new Error("Refresh token not found!");

    const newAccessToken = await refreshToken(session.refreshToken);
    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      res = await fetchWrapper(url, options);
    }
  }
  return res;
}
