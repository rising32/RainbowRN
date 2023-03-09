import React, {useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationRoot from './navigation/NavigationRoot';

const Root = () => {
  const fetchUser = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      jsonValue != null ? JSON.parse(jsonValue) : null;

      if (jsonValue) {
        // const response = await sendLogin(JSON.parse(jsonValue));
      }
    } catch (error) {
      await AsyncStorage.removeItem('@password');
      // setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const navigationReady = () => {
    console.log('navigation ready!');
  };

  return <NavigationRoot onReady={navigationReady} />;
};

export default Root;
