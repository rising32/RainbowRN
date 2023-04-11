import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {LogoImg} from '../../assets/images';
import {EyeOffSVG, EyeSVG, PasswordSVG, UserSVG} from '../../components/Icons';
import useAuth from './hooks/useAuth';
import CryptoJS from 'react-native-crypto-js';
import Config from 'react-native-config';

export type LoginForm = {
  userName: string;
  password: string;
  device: 'mobile' | 'web';
};

const LoginScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordVisibility, setPasswordVisibility] = React.useState(true);

  const {loading, error, reset, onLogin} = useAuth();

  const onChangeUsername = (text: string) => {
    reset();
    setUsername(text);
  };
  const onChangePassword = (text: string) => {
    reset();
    setPassword(text);
  };

  const onSubmit = React.useCallback(async () => {
    Keyboard.dismiss();
    if (Config.CRYPTO_SECRET_KEY) {
      const cryptoPassword = CryptoJS.AES.encrypt(
        password,
        Config.CRYPTO_SECRET_KEY,
      ).toString();
      onLogin({
        userName: username,
        password: cryptoPassword,
        device: 'mobile',
      });
    }
  }, [onLogin, password, username]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,
      }}>
      <Image source={LogoImg} style={{width: 170, height: 161}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 50,
        }}>
        <UserSVG height={32} width={32} />
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            padding: 10,
            fontSize: 20,
            marginLeft: 15,
          }}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Username"
          placeholderTextColor="gray"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 50,
        }}>
        <PasswordSVG height={32} width={32} />
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            padding: 10,
            fontSize: 20,
            marginLeft: 15,
          }}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
        />
        <Pressable
          style={{
            position: 'absolute',
            right: 0,
          }}
          onPress={() => setPasswordVisibility(!passwordVisibility)}>
          {passwordVisibility ? (
            <EyeSVG height={32} width={32} />
          ) : (
            <EyeOffSVG height={32} width={32} />
          )}
        </Pressable>
      </View>
      {error && (
        <Text style={{textAlign: 'center', color: 'red'}}>{error}</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 50,
        }}>
        <Pressable
          style={{
            backgroundColor: 'red',
            width: '100%',
            height: 50,
            borderRadius: 50,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={{color: 'white', fontSize: 20}}>Login</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
