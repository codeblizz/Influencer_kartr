import useSWR from 'swr';

interface FetcherOptions<T> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: T;
}

const fetcher = async <T>(url: string, options?: FetcherOptions<T>) => {
  const config: RequestInit = {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  if (options?.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function useApi<T>(url: string | null, options?: FetcherOptions<T>) {
  return useSWR<T>(
    url ? [url, options] : null,
    ([url, options]) => fetcher(url, options as FetcherOptions<T>),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
}

export function useApiMutation() {
  const mutate = async <T>(url: string, options: FetcherOptions<T>) => {
    try {
      const result = await fetcher(url, options);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return { mutate };
}
