import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import Avatar from '../../../components/Avatar/Avatar';
import PressableButton from '../../../components/PressableButton/PressableButton';

const SideBar = () => {
  const [isFetching, setIsFetching] = useState(false);

  const onPress = useCallback(() => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        width: 350,
        height: '100%',
        backgroundColor: '#495057',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Avatar width={180} style={{marginTop: 100, marginBottom: 60}} />
        <View
          style={{
            width: '80%',
            rowGap: 20,
            alignItems: 'center',
          }}>
          <PressableButton
            text="Manage Category"
            onPress={onPress}
            isFetching={isFetching}
            style={{
              backgroundColor: '#D9D9D9',
            }}
            textStyle={{
              color: '#495057',
              fontSize: 20,
            }}
          />
          <PressableButton
            text="Manage Trainings"
            onPress={onPress}
            isFetching={isFetching}
            style={{
              backgroundColor: '#D9D9D9',
            }}
            textStyle={{
              color: '#495057',
              fontSize: 20,
            }}
          />
          <PressableButton
            text="Security"
            onPress={onPress}
            isFetching={isFetching}
            style={{
              backgroundColor: '#D9D9D9',
            }}
            textStyle={{
              color: '#495057',
              fontSize: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SideBar;
