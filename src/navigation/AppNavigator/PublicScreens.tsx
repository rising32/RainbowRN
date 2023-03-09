import React from 'react';
import {PUBLICSCREENS, PublicRootStackParamList} from '../types';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';

const PublicStack = createStackNavigator<PublicRootStackParamList>();

const PublicScreens = () => (
  <PublicStack.Navigator
    initialRouteName={PUBLICSCREENS.LOGIN}
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <PublicStack.Screen name={PUBLICSCREENS.LOGIN} component={LoginScreen} />
  </PublicStack.Navigator>
);

export default PublicScreens;
