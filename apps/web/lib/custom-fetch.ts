export interface FetchOptions extends RequestInit {
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

// Generic fetch wrapper with improved error handling and type safety
export const fetchWrapper = async <T = any>(
  url: string | URL,
  options: FetchOptions = {}
): Promise<
  { data: T | null; status: number } | { error: any; status: number }
> => {
  const { queryParams, headers, ...restOptions } = options;

  // Construct URL with query parameters
  const queryString = queryParams
    ? "?" +
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(queryParams).map(([k, v]) => [k, String(v)])
        )
      ).toString()
    : "";
  const finalUrl = `${url}${queryString}`;

  // Default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(finalUrl, {
      ...restOptions,
      headers: { ...defaultHeaders, ...headers },
    });

    // Handle non-OK responses
    if (!response.ok) {
      let errorDetails: any;
      try {
        errorDetails = await response.json();
      } catch {
        errorDetails = await response.text();
      }

      return {
        status: response.status,
        error: errorDetails?.message || "Unknown error occurred",
      };
    }

    // Parse response as JSON
    const text = await response.text();
    const data: T = text ? JSON.parse(text) : null;
    return { status: response.status, data };
  } catch (error: any) {
    console.error("Fetch error:", error.message || error);
    return {
      status: 500,
      error: "Network error or fetch failed",
    };
  }
};
