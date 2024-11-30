export interface FetchOptions extends RequestInit {
  queryParams?: Record<string, string | number | boolean>;
  headers?: HeadersInit;
}

const fetchWrapper = async <T>(
  url: string | URL,
  options: FetchOptions = {}
) => {
  const { queryParams, headers, ...restOptions } = options;

  // Construct URL with query parameters if provided
  const queryString = queryParams
    ? "?" +
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(queryParams).map(([k, v]) => [k, String(v)])
        )
      ).toString()
    : "";
  const finalUrl = url + queryString;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(finalUrl, {
      ...restOptions,
      headers: { ...defaultHeaders, ...headers },
    });

    if (!response.ok) {
      let errorDetails = "";
      try {
        errorDetails = await response.json();
      } catch {
        errorDetails = await response.text();
      }
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${JSON.stringify(
          errorDetails
        )}`
      );
    }

    // Parse response as JSON
    const data: T = await response.json();
    return { status: response.status, data };
  } catch (error: any) {
    console.error("Fetch error:", error.message || error);
    throw error;
  }
};

export default fetchWrapper;
