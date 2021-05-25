import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';

const Providers = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default Providers;
