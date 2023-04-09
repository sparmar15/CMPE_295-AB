import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  readMessage,
  getMessage,
  sendMessage,
  registerSocket,
} from '../../../socket';
import {logger} from 'react-native-logs';
import axios from 'axios';
import {format} from 'timeago.js';
const userId = 'soham';
// const receiver = 'milan';

const ChatScreen = ({route}) => {
  const {conversation, friendId} = route.params;
  const scrollViewRef = useRef();

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const Log = logger.createLogger();

  useEffect(() => {
    getMessage(getMessageCallback);
    scrollViewRef.current.scrollToEnd({animated: true}); // scroll to bottom on mount
  }, []);

  const getMessageCallback = message => {
    setArrivalMessage(message);
  };

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.conversationId == conversation._id &&
      setMessages(prev => [...prev, arrivalMessage]);
    scrollViewRef.current.scrollToEnd({animated: true}); // scroll to bottom on mount
  }, [arrivalMessage]);

  useEffect(() => {
    // Log.info('inside use effect', conversation, friendId);
    // getMessages(sender, receiver, receiveMessage1);
    registerSocket(userId);

    const getMessages = async () => {
      try {
        const res = await axios.get(
          'http://localhost:4000/messages/' + conversation._id,
        );
        setMessages(res.data);
        // Log.info(res.data);
      } catch (error) {
        Log.error('Error in getting messages', error);
      }
    };
    readMessage(conversation._id);
    getMessages();
  }, [conversation]);

  const renderChat = item => {
    const timestamp = new Date(item.createdAt);
    return (
      <View
        style={[
          styles.chatContainer,
          item.sender === userId ? styles.chatSent : styles.chatReceived,
        ]}>
        <Text style={styles.chatText}>{item.content}</Text>
        <Text style={styles.chatTime}>
          {format(timestamp)}
          {/* {timestamp.getHours()}:{timestamp.getMinutes()} */}
        </Text>
      </View>
    );
  };
  const handleSend = async () => {
    if (newMessage) {
      const message = {
        sender: userId,
        conversationId: conversation._id,
        content: newMessage,
      };

      try {
        const res = await axios.post(
          'http://localhost:4000/messages/',
          message,
        );
        Log.info(res.data);

        setNewMessage('');
        await setMessages([...messages, res.data]);
        scrollViewRef.current.scrollToEnd({animated: true});
        sendMessage(res.data, friendId);
      } catch (error) {
        Log.error('error in posting messages', error);
      }

      // setChat([...chat, newChat]);
      // sendMessage(sender, receiver, message);
      // setMessage('');
    }
    // Log.info('chate', chat);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <View style={styles.contactContainer}>
          <Image
            // source={require('../Assets/profile.png')}
            style={styles.contactImage}
          />
          <Text style={styles.contactName}>{friendId}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(width, height) =>
          scrollViewRef.current.scrollTo({y: height})
        }>
        {messages.map(message => renderChat(message))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.input}
          multiline
          numberOfLines={2}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <MaterialIcons name="send" size={24} color="#00008F" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    // backgroundColor: '#075E54',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'flex-start',
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  line: {
    height: 1,
    backgroundColor: '#085f87',
    width: '100%',
  },
  chatContainer: {
    maxWidth: '80%',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  chatText: {
    fontSize: 16,
    lineHeight: 20,
  },
  chatTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  chatSent: {
    backgroundColor: '#a8e0fa',
    alignSelf: 'flex-end',
  },
  chatReceived: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
  },
  singleChatContainer: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EAEAEA',
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    height: 45,
    verticalAlign: 'auto',
    borderWidth: 1,
    borderColor: '#085f87',
  },
  sendButton: {
    borderRadius: 5,
    borderColor: '#085f87',
    borderWidth: 1,
    // backgroundColor: '#00008F',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
  },
  sendIcon: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default ChatScreen;
