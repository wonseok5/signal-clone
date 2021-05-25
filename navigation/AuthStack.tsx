import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const globalScreenOptions = {
  headerStyle: {backgroundColor: 'blue'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
};
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
