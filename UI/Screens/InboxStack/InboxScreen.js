import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {registerSocket} from '../../../socket';
import {logger} from 'react-native-logs';
import axios from 'axios';
import Conversation from './Conversation';

const userId = 'soham';

const InboxScreen = ({navigation}) => {
  const [conversations, setConversations] = useState([]);
  const Log = logger.createLogger();

  useEffect(() => {
    registerSocket(userId);
    // registerSocket(sender, getChats);
    const getConversations = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/conversations/' + userId,
        );
        setConversations(res.data);
      } catch (error) {
        Log.error('error in fetching conversations', error);
      }
    };
    getConversations();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="message1" color={'#085f87'} size={36} />
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>
      <View style={styles.line} />
      {conversations.map(c => (
        <Conversation
          key={c._id}
          conversation={c}
          currentUser={userId}
          // onPress={handleChatClick}
        />
      ))}
      {/* <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={item => item._id}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginLeft: 8,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  line: {
    height: 2,
    backgroundColor: '#085f87',
    width: '100%',
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#444444',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666666',
  },
  chatUnread: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatUnreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default InboxScreen;
