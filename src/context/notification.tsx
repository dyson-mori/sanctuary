import React, { createContext, ReactNode, useState } from 'react';

interface NotificationProps {
  notification: boolean;
  setNotification: (e: boolean) => void;
};

export const NotificationContext = createContext({} as NotificationProps);

const Notification: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [state] = useState(() => {
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