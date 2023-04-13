import React from 'react';
import {LoginForm} from '../LoginScreen';
import {IUser} from '../../../recoil/interface';
import {request} from '../../../utils';
import {useSetRecoilState} from 'recoil';
import {userState} from '../../../recoil/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../../libs/contexts/AppProvider';

export default function useAuth() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const {defaultURL} = React.useContext(AppContext);
  const setUser = useSetRecoilState(userState);

  const reset = () => {
    setError('');
  };

  const onLogin = async (params: LoginForm) => {
    if (!params.userName) {
      setError('Username is required.');
      return;
    }
    if (!params.password) {
      setError('Password is required.');
      return;
    }
    try {
      setLoading(true);
      const userInfo = await request<IUser>(`${defaultURL}/api/auth`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (userInfo.role === 2) {
        await AsyncStorage.setItem('@user_id', userInfo.userId);
        setUser(userInfo);
      } else {
        setError('Invalid Credentials.');
      }
    } catch (err) {
      console.log('login error = ', err);
      setError('Username or Password is wrong.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    reset,
    error,
    onLogin,
  };
}
