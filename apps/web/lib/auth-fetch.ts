import { refreshToken } from "./auth";
import { fetchWrapper } from "./custom-fetch";
import { getSession } from "./session";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function authFetch(url: string | URL, options: FetchOptions = {}) {
  const session = await getSession();
  const authOptions: FetchOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...(session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
    },
  };

  let res = await fetchWrapper(url, authOptions);

  // Handle token refresh for 401 errors
  if (res.status === 401 && session?.refreshToken) {
    const newAccessToken = await refreshToken(session.refreshToken);

    if (newAccessToken) {
      authOptions.headers = {
        ...authOptions.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      res = await fetchWrapper(url, authOptions);
    }
  }

  return res;
}
