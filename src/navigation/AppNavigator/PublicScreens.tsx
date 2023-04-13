import React from 'react';
import {PUBLICSCREENS, PublicStackParamList} from '../types';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';

const PublicStack = createStackNavigator<PublicStackParamList>();

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
