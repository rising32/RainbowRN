import React, {useContext} from 'react';
import PublicScreens from './PublicScreens';
import {CurrentUserContext} from '../../libs/contexts/AppProvider';
import AuthScreens from './AuthScreens';

const AppNavigator = () => {
  const {currentUser} = useContext(CurrentUserContext);
  if (currentUser.role !== 'guest') {
    return <AuthScreens />;
  }
  return <PublicScreens />;
};

export default AppNavigator;
