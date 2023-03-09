import React from 'react';
import {Text, View} from 'react-native';

const VideoView = () => {
  return (
    <View
      style={{
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 36, color: '#4E88F8', fontWeight: 'bold'}}>
        Video
      </Text>
    </View>
  );
};

export default VideoView;
