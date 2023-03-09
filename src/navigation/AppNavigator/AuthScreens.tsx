import React from 'react';
import {AUTHENTICATEDSCREENS, AuthenticatedRootStackParamList} from '../types';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../../screens/home/HomeScreen';

const AuthStack = createStackNavigator<AuthenticatedRootStackParamList>();

const AuthScreens = () => (
  <AuthStack.Navigator
    initialRouteName={AUTHENTICATEDSCREENS.HOME}
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <AuthStack.Screen name={AUTHENTICATEDSCREENS.HOME} component={HomeScreen} />
  </AuthStack.Navigator>
);

export default AuthScreens;
