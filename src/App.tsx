import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Root from './Root';
import CustomStatusBar from './components/CustomStatusBar';
import AppProvider from './libs/contexts/AppProvider';
import {RecoilRoot} from 'recoil';
import {MenuProvider} from 'react-native-popup-menu';
import Core from './components/Core';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <MenuProvider>
          <RecoilRoot>
            <AppProvider>
              <CustomStatusBar />
              <Root />
            </AppProvider>
            <Core />
          </RecoilRoot>
        </MenuProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
