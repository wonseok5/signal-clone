import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomListItem from '../components/CustomListItem';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../navigation/AuthProvider';
import {HomeStackParamList} from '../navigation/HomeStack';
import db from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: FC<Props> = ({navigation}) => {
  const [chats, setChats] = useState<any[]>([]);
  const {logout} = useContext(AuthContext as any);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerStyle: {backgroundColor: 'white'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => {
        return (
          <View style={{marginLeft: 20}}>
            <TouchableOpacity activeOpacity={0.5} onPress={logout}>
              <Avatar
                rounded
                source={{uri: auth()?.currentUser?.photoURL as string}}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 80,
              marginRight: 20,
            }}>
            <TouchableOpacity>
              <Icon name="camera-retro" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddChat');
              }}>
              <Icon name="pencil" size={24} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, logout]);
  useEffect(() => {
    const unsub = db()
      .collection('chats')
      .onSnapshot(snapshot => {
        const fetchedChats = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }));
        setChats(fetchedChats);
      });
    return unsub;
  }, []);

  const onEnterChat = useCallback(
    (id: string, chatName: string) => {
      navigation.navigate('ChatScreen', {id, chatName});
    },
    [navigation],
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        {chats.map(({id, data: {chatName}}) => {
          return (
            <CustomListItem
              key={id}
              id={id}
              chatName={chatName}
              enterChat={onEnterChat}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
