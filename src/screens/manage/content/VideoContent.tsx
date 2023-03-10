import React from 'react';
import {View, Text} from 'react-native';
import PressableButton from '../../../components/PressableButton/PressableButton';

const VideoContent = () => {
  return (
    <View
      style={{
        width: 500,
        height: '100%',
        borderTopWidth: 1,
        borderRightWidth: 1,
      }}>
      <View
        style={{
          height: 60,
          borderBottomWidth: 1,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Video
        </Text>
      </View>
      <View
        style={{
          height: 80,
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          padding: 25,
        }}>
        <View
          style={{
            height: 60,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
            numberOfLines={2}>
            Salmon & Avocado Temaki
          </Text>
        </View>
        <View
          style={{
            rowGap: 36,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: 200,
              backgroundColor: '#495057',
            }}
          />
          <PressableButton
            text="Upload Video"
            style={{
              backgroundColor: '#D9D9D9',
            }}
            textStyle={{
              color: '#495057',
              fontSize: 20,
            }}
          />
          <PressableButton
            text="Save"
            style={{
              backgroundColor: '#FF50B9',
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

export default VideoContent;
