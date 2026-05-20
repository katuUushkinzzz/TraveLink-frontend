import { useState, useCallback } from "react";

import { PointData } from "../types/localTypes";

export default function usePoints(initialValue: PointData[] = []) {
  const [points, setPoints] = useState<PointData[]>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPoints = useCallback(async (page: number, token: string) => {
    const baseUrl = `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/point/cards/${page}`;

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

      setPoints(prev => [...prev, ...json]);
      console.log(json)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { points, setPoints, isLoading, error, fetchPoints };
}