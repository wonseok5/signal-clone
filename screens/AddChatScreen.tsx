import React, {FC, useCallback, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStack';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '@react-native-firebase/firestore';
type AddChatScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'AddChat'
>;

type Props = {
  navigation: AddChatScreenNavigationProp;
};

const AddChatScreen: FC<Props> = ({navigation}) => {
  const [input, setInput] = useState('');

  const createChat = useCallback(async () => {
    await db()
      .collection('chats')
      .add({chatName: input})
      .then(() => {
        navigation.goBack();
      })
      .catch(error => console.error(error));
  }, [input, navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  });
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={setInput}
        leftIcon={<Icon name="comments" size={24} />}
        autoCapitalize="none"
        onSubmitEditing={createChat}
      />
      <Button disabled={!input} onPress={createChat} title="create new chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', padding: 30, flex: 1},
});
