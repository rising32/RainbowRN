import React from 'react';
import {View, Text} from 'react-native';
import Category from './Category';
import Product from './Product';
import VideoContent from './VideoContent';

const Content = () => {
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        // marginRight: 10,
        // marginBottom: 10,
      }}>
      <View
        style={{
          borderTopWidth: 1,
          borderRightWidth: 1,
          paddingVertical: 10,
          paddingLeft: 50,
        }}>
        <Text style={{fontSize: 32, color: 'black'}}>Manage Trainings</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <Category />
        <Product />
        <VideoContent />
      </View>
    </View>
  );
};

export default Content;
