import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Response = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

type Key = '@preview-videos' | '@dark-mode' | '@language' | '@warning';

export function useStorage<T>(key: Key, initialState: T): Response {
  const [state, setState] = useState(() => {
    // if (typeof window === "undefined") return;

    const storageValue = localStorage.getItem(key);

    if (storageValue && initialState === null) {
      return JSON.parse(storageValue);
    };

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state])

  return [state, setState];
}