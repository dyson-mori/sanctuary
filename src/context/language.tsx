import { useStorage } from '@hooks';
import React, { createContext, ReactNode, useState } from 'react';

interface LanguageProps {
  language: 'pt' | 'en';
  setLanguage: (language: 'pt' | 'en') => void;
};

export const LanguageContext = createContext({} as LanguageProps);

const Language = ({ children }) => {
  const [storage] = useStorage('@language', 'pt');

  const setLanguage = () => { };

  return (
    <LanguageContext.Provider value={{
      language: 'pt',
      setLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default Language;