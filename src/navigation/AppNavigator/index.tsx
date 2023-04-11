import React from 'react';
import PublicScreens from './PublicScreens';
import AuthScreens from './AuthScreens';
import {useRecoilValue} from 'recoil';
import {userState} from '../../recoil/atoms';

const AppNavigator = () => {
  const user = useRecoilValue(userState);
  if (user) {
    return <AuthScreens />;
  }
  return <PublicScreens />;
};

export default AppNavigator;
