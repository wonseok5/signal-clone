import React, {useCallback, useContext, useLayoutEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Button, Text, Input} from 'react-native-elements';
import {AuthContext} from '../navigation/AuthProvider';

const RegisterScreen = ({navigation}: any) => {
  const {register} = useContext(AuthContext as any);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back To Login',
    });
  }, [navigation]);
  const onRegiser = useCallback(() => {
    register(email, password, name, imageUrl);
  }, [name, password, email, imageUrl, register]);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={80}
      style={styles.container}>
      <Text h3 style={{marginBottom: 50}}>
        create signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          keyboardType="default"
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          keyboardType="default"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          autoCapitalize="none"
        />
        <Input
          placeholder="Profile Picture Url(optional)"
          keyboardType="url"
          value={imageUrl}
          onChangeText={text => setImageUrl(text)}
          onSubmitEditing={onRegiser}
          autoCapitalize="none"
        />
      </View>
      <Button
        raised
        title="Register"
        onPress={onRegiser}
        containerStyle={styles.button}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});
