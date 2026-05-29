import { useState, useCallback, ActionDispatch, Dispatch, SetStateAction } from "react";

import { PointData } from "../types/localTypes";
import { Action, State } from "./reducer";

export interface PointUtils {
  points: PointData[];
  setPoints: Dispatch<SetStateAction<PointData[]>>;
  isLoading: boolean;
  error: Error | null;
  fetchPoints: (page: number) => Promise<void>;
  searchPoints: () => Promise<void>;
}

export default function usePoints(initialValue: PointData[] = [], state: State, dispatch: ActionDispatch<[action: Action]>) {
  const [points, setPoints] = useState<PointData[]>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPoints = useCallback(async (page: number) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_PROTO}://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/point/cards/${page}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
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

  const searchPoints = useCallback(async () => {
    if (state.searchQuery === "") return

    dispatch({ type: 'SET_SEARCHING', payload: true })
    setPoints([])

    const baseUrl = `http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`;
    const url = `${baseUrl}/search/test?query=${state.searchQuery}`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'get'
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json()

      setPoints(json)
      console.log(json)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, state.searchQuery])

  return { points, setPoints, isLoading, error, fetchPoints, searchPoints };
}