import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SideBar from './sidebar/SideBar';
import Content from './content/Content';

const ManageScreen = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 24,
          flexDirection: 'row',
        }}>
        <SideBar />
        <Content />
      </SafeAreaView>
    </>
  );
};

export default ManageScreen;
