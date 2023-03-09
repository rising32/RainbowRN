import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ComposeProviders from './components/ComposeProviders';
import AppProvider from './libs/contexts/AppProvider';
import LayoutProvider from './libs/contexts/LayoutProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './Root';
import CustomStatusBar from './components/CustomStatusBar';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ComposeProviders
        components={[AppProvider, LayoutProvider, SafeAreaProvider]}>
        <CustomStatusBar />
        <Root />
      </ComposeProviders>
    </GestureHandlerRootView>
  );
}

export default App;
