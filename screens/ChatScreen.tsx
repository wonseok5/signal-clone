import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {
  FC,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {HomeStackParamList} from '../navigation/HomeStack';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import db from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

type ChatScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'ChatScreen'
>;
type ChatScreenRouteProp = RouteProp<HomeStackParamList, 'ChatScreen'>;

type Props = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen: FC<Props> = ({navigation, route}) => {
  const {userInfo} = useContext(AuthContext as any);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const scrollViewRef = useRef() as any;
  const sendMessage = useCallback(() => {
    db()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        message: input,
        displayName: userInfo.displayName,
        email: userInfo.email,
        photoUrl: userInfo.photoUrl,
        timestamp: new Date().getTime(),
      })
      .then(() => {
        Keyboard.dismiss();
        setInput('');
      })
      .catch(error => console.error(error));
  }, [input, route, userInfo]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar
              rounded
              source={{
                uri: messages[0]?.photoUrl,
              }}
            />
            <Text style={{color: 'black', marginLeft: 10, fontWeight: '700'}}>
              {route.params.chatName}
            </Text>
          </View>
        );
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={24} color="blue" />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
              width: 60,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <Icon name="videocamera" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="phone" size={24} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, route, messages]);
  useLayoutEffect(() => {
    const unsub = db()
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });
    return unsub;
  }, [route]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={styles.innerContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current?.scrollToEnd({animated: true});
          }}
          contentContainerStyle={styles.scrollViewStyle}>
          {messages.map(message =>
            message.email === userInfo.email ? (
              <View key={message.id} style={styles.reciever}>
                <Avatar
                  source={{uri: message.photoUrl}}
                  rounded
                  size={30}
                  containerStyle={{
                    position: 'absolute',
                    right: -5,
                    bottom: -15,
                  }}
                />
                <Text style={styles.recieverText}>{message.message}</Text>
                <Text style={styles.recieverName}>{message.displayName}</Text>
              </View>
            ) : (
              <View key={message.id} style={styles.sender}>
                <Avatar
                  containerStyle={{
                    position: 'absolute',
                    left: -5,
                    bottom: -15,
                  }}
                  source={{uri: message.photoUrl}}
                  rounded
                />
                <Text style={styles.senderText}>{message.message}</Text>
                <Text style={styles.senderName}>{message.displayName}</Text>
              </View>
            ),
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="message"
            style={styles.textInput}
            value={input}
            onChangeText={text => setInput(text)}
            autoCapitalize="none"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
            <FAIcon name="send" size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  innerContainer: {flex: 1},
  scrollViewContainer: {flex: 1},
  scrollViewStyle: {
    paddingVertical: 10,
    flexDirection: 'column-reverse',
  },
  reciever: {
    padding: 15,
    backgroundColor: '#CCCCCC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  recieverText: {},
  recieverName: {
    left: 10,
    paddingLeft: 10,
    fontSize: 10,
    color: 'black',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2868E6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  senderText: {},
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  textInput: {
    flex: 1,
    bottom: 0,
    backgroundColor: '#ECECEC',
    marginRight: 15,
    height: 40,
    padding: 10,
    color: 'gray',
    borderRadius: 30,
  },
});
