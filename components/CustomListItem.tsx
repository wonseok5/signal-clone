import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import db from '@react-native-firebase/firestore';
type Props = {
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
};
const CustomListItem: FC<Props> = ({id, chatName, enterChat}) => {
  const [lastMessage, setLastMessage] = useState([] as any);
  useEffect(() => {
    const unsub = db()
      .collection('chats')
      .doc(id)
      .collection('messages')
      .limit(1)
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setLastMessage(snapshot.docs.map(doc => doc.data())),
      );
    return unsub;
  });
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id}>
      <Avatar
        source={{
          uri:
            lastMessage?.[0]?.photoUrl ||
            'https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png',
        }}
        rounded
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: '800'}}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
