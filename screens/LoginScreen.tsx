import auth from '@react-native-firebase/auth';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}: any) => {
  const {login} = useContext(AuthContext as any);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(() => {
    login(email, password);
  }, [login, email, password]);
  useEffect(() => {
    const unsub = auth().onAuthStateChanged(authUser => {
      console.log('changed');
      if (authUser) {
        navigation.replace('Home');
      }
    });
    return unsub();
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={80}
      style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={{
          uri: 'https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png',
        }}
        style={{width: 200, height: 200}}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoFocus
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          value={password}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
          onSubmitEditing={onLogin}
        />
      </View>
      <Button containerStyle={styles.button} title="LogIn" onPress={onLogin} />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {width: 300},
  button: {width: 200, marginTop: 10},
});
export default LoginScreen;
