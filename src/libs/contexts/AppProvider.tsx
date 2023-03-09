import React, {createContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {IUser, ThemeContextType, DefaultUser} from '../../Interface';

type UserContextType = {
  currentUser: IUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
};
const ThemeContext = createContext<ThemeContextType>('light');
export const CurrentUserContext = createContext<UserContextType>(
  {} as UserContextType,
);

type Props = {
  children: React.ReactNode;
};

function AppProvider({children}: Props) {
  const [theme, updateTheme] = useState<ThemeContextType>('light');
  const [currentUser, setCurrentUser] = useState<IUser>(DefaultUser);

  useEffect(() => {
    const mode = Appearance.getColorScheme();
    mode ? updateTheme(mode) : updateTheme('light');

    Appearance.addChangeListener(({colorScheme}) => {
      colorScheme ? updateTheme(colorScheme) : null;
    });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}>
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default AppProvider;
