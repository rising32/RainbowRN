import React from 'react';

type AppContextType = {
  defaultURL: string;
  changeDefaultURL: (url: string) => void;
};

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType,
);

type Props = {
  children: React.ReactNode;
};

function AppProvider({children}: Props) {
  const [defaultURL, setDefaultURL] = React.useState('http://18.217.36.36');

  const changeDefaultURL = (url: string) => {
    setDefaultURL(url);
  };

  return (
    <AppContext.Provider value={{defaultURL, changeDefaultURL}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
