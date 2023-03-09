import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Menu from './components/Menu';
import VideoView from './components/VideoView';
import Bottom from './components/Bottom';

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          flex: 1,
          marginTop: 24,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Menu />
          <VideoView />
        </View>
        <Bottom />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
