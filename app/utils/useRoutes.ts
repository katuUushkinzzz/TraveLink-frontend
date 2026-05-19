import { useState, useCallback } from "react";

import { RouteData } from "../types/localTypes";

export function useRoutes(initialValue: RouteData[] = []) {
  const [routes, setRoutes] = useState<RouteData[]>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoutes = useCallback(async (page: number, token: string) => {
    const baseUrl = `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/route/cards/${page}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      setRoutes((prev) => (page === 1 ? json : [...prev, ...json]));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { routes, setRoutes, isLoading, error, fetchRoutes };
}