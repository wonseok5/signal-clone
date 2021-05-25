import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Providers from './navigation';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar />
        <Providers />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
