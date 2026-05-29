import { useState, useCallback, Dispatch, SetStateAction } from "react";

import { RouteData } from "../types/localTypes";

export interface RouteUtils {
  routes: RouteData[];
  setRoutes: Dispatch<SetStateAction<RouteData[]>>;
  isLoading: boolean;
  error: Error | null;
  fetchRoutes: (page: number) => Promise<void>;
}

export default function useRoutes(initialValue: RouteData[] = [], authToken: string | null) {
  const [routes, setRoutes] = useState<RouteData[]>(initialValue);
  const [token, setToken] = useState<string>(authToken ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoutes = useCallback(async (page: number, authToken?: string) => {
    const baseUrl = `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/route/cards/${page}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken ?? token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      setRoutes((prev) => [...prev, ...json]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return { routes, setRoutes, isLoading, error, fetchRoutes, token, setToken };
}