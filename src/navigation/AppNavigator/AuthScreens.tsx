import React from 'react';
import {AUTHENTICATEDSCREENS, AuthenticatedRootStackParamList} from '../types';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import EditCalibrationScreen from '../../screens/home/EditCalibrationScreen';
import EditInspectionScreen from '../../screens/home/EditInspectionScreen';

const AuthStack = createStackNavigator<AuthenticatedRootStackParamList>();

const AuthScreens = () => (
  <AuthStack.Navigator initialRouteName={AUTHENTICATEDSCREENS.MAIN}>
    <AuthStack.Screen
      name={AUTHENTICATEDSCREENS.MAIN}
      component={DrawerNavigator}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name={AUTHENTICATEDSCREENS.EDITCALIBRATION}
      component={EditCalibrationScreen}
      // options={{headerShown: false}}
      options={({route}) => ({title: route.params.title})}
    />
    <AuthStack.Screen
      name={AUTHENTICATEDSCREENS.EDITINSPECTION}
      component={EditInspectionScreen}
      // options={{headerShown: false}}
      options={({route}) => ({title: route.params.title})}
    />
  </AuthStack.Navigator>
);

export default AuthScreens;
