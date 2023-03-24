import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    {id: 1, sender: 'me', message: 'Hello', time: '9:00 AM'},
    {id: 2, sender: 'you', message: 'Hi', time: '9:01 AM'},
  ]);

  const renderChat = ({item}) => {
    return (
      <View
        style={[
          styles.chatContainer,
          item.sender === 'me' ? styles.chatSent : styles.chatReceived,
        ]}>
        <Text style={styles.chatText}>{item.message}</Text>
        <Text style={styles.chatTime}>{item.time}</Text>
      </View>
    );
  };

  const handleSend = () => {
    if (message) {
      const newChat = {
        id: chat.length + 1,
        sender: 'me',
        message: message,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
      setChat([...chat, newChat]);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>
        <View style={styles.contactContainer}>
          <Image
            source={require('../Assets/profile.png')}
            style={styles.contactImage}
          />
          <Text style={styles.contactName}>John Doe</Text>
        </View>
      </View>
      <View style={styles.line} />

      <FlatList
        data={chat}
        renderItem={renderChat}
        keyExtractor={item => item.id.toString()}
        // style={{flex: 1}}
        contentContainerStyle={styles.singleChatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
          multiline
          numberOfLines={2}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <MaterialIcons name="send" size={24} color="#FFF" />
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
    backgroundColor: '#E0E0E0',
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
    backgroundColor: '#DCF8C6',
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
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EAEAEA',
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: 50,
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  sendIcon: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default ChatScreen;
