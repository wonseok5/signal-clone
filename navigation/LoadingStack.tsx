import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from '../screens/LoadingScreen';

export type LoadingStackParamList = {
  Loading: undefined;
};
const Stack = createStackNavigator();

const LoadingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Loading" headerMode="none">
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default LoadingStack;
