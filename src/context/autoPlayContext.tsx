import React, { createContext, useContext, useState } from "react";

interface AutoPlayContextProps {
  autoPlay: boolean;
  togglePlay: () => void;
}

const PlayContext = createContext({} as AutoPlayContextProps);

export const usePlay = () => useContext(PlayContext);

export const PlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [autoPlay, setAutoPlay] = useState(() => {
    if (typeof window === "undefined") return;

    const storageValue = localStorage.getItem("autoPlay");

    if (storageValue) {
      return JSON.parse(storageValue);
    };

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return false;
    }
  });

  const togglePlay = () => {
    setAutoPlay(!autoPlay);
    localStorage.setItem("autoPlay", JSON.stringify(!autoPlay));
  };

  return (
    <PlayContext.Provider value={{ autoPlay, togglePlay }}>
      {children}
    </PlayContext.Provider>
  );
};
