import React, {useCallback, useState, useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import KeyboardAvoidingComponent from '../../components/KeyboardAvoidingComponent';
import TextInput from '../../components/TextInput/TextInput';
import Avatar from '../../components/Avatar/Avatar';
import PressableButton from '../../components/PressableButton/PressableButton';
import {CurrentUserContext} from '../../libs/contexts/AppProvider';

const LoginScreen = () => {
  const [isFetching, setIsFetching] = useState(false);
  const {setCurrentUser} = useContext(CurrentUserContext);

  const onPress = useCallback(() => {
    setIsFetching(true);
    setTimeout(() => {
      setCurrentUser({
        id: '123456',
        username: 'rainbow',
        role: 'user',
      });
      setIsFetching(false);
    }, 3000);
  }, [setCurrentUser]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,
        backgroundColor: '#FF50B9',
      }}>
      <KeyboardAvoidingComponent
        additionalStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            width: 320,
            rowGap: 36,
            alignItems: 'center',
          }}>
          <Avatar width={200} />
          <TextInput placeholder="Username" />
          <TextInput placeholder="Password" />
          <PressableButton
            text="Login"
            onPress={onPress}
            isFetching={isFetching}
          />
        </View>
      </KeyboardAvoidingComponent>
    </SafeAreaView>
  );
};

export default LoginScreen;
