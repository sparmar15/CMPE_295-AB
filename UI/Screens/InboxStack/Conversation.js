import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {logger} from 'react-native-logs';
import {useNavigation} from '@react-navigation/native';

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const Log = logger.createLogger();
  const navigation = useNavigation();

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser);
    setUser(friendId);
    //get details of the friend id
  }, [conversation, currentUser]);
  const handleChatClick = () => {
    Log.info('press', user);
    navigation.navigate('Chat', {
      conversation,
      friendId: user,
    });
  };
  return (
    <TouchableOpacity style={styles.chat} onPress={handleChatClick}>
      {/* <Image source={item.image} style={styles.chatImage} /> */}
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{user}</Text>
        <Text style={styles.chatMessage}>"Last message"</Text>
      </View>
      {/* {item.unread > 0 && (
        <View style={styles.chatUnread}>
          <Text style={styles.chatUnreadText}>{item.unread}</Text>
        </View>
      )} */}
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
