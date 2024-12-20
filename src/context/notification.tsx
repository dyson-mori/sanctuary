import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface NotificationProps {
  notification: boolean;
  setNotification: (e: boolean) => void;
};

export const NotificationContext = createContext({} as NotificationProps);

const Notification: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [state, setState] = useState<any>(() => {
    const storageValue = typeof window !== "undefined" ? localStorage.getItem('@marks: cart') : false;

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return [];
    }
  });

  const setNotification = () => { };

  const value = {
    notification: state,
    setNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default Notification;