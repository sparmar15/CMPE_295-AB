import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {logger} from 'react-native-logs';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastMessage, setLastMessage] = useState('');
  const Log = logger.createLogger();
  const navigation = useNavigation();

  useEffect(() => {
    // const friendId = conversation.members.find(m => m !== currentUser);
    // setUser(friendId);
    
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
    const getUnreadMessageCount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/messages/unread/${conversation._id}?sender=${friendId}`,
        );
        setUnreadCount(res.data);
      } catch (error) {
        Log.error('Error in getting unread message count', error);
      }
    };
    const getLastMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/messages/last/${conversation._id}`,
        );
        setLastMessage(res.data.content);
        Log.info(res.data);
      } catch (error) {
        Log.error('Error in getting last message', error);
      }
    };

    getUnreadMessageCount();
    getLastMessage();
    navigation.navigate('Inbox', {
      screen: 'ChatScreen',
      params: {conversation, friendId: user},
    });
    //get details of the friend id
  }, [conversation, currentUser]);
  const handleChatClick = () => {
    Log.info('press', user);
    navigation.navigate('Inbox', {
      screen: 'ChatScreen',
      params: {conversation, friendId: user},
    });
  };
  return (
    <TouchableOpacity style={styles.chat} onPress={handleChatClick}>
      {/* <Image source={item.image} style={styles.chatImage} /> */}
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{user}</Text>
        <Text style={styles.chatMessage}>{lastMessage}</Text>
      </View>
      {unreadCount > 0 && (
        <View style={styles.chatUnread}>
          <Text style={styles.chatUnreadText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#085f87',
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
