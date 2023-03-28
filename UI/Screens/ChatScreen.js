import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {registerSocket, sendMessage, readMessage} from '../../socket';
const route = {sender: 'milan', receiver: 'soham'};

const ChatScreen = () => {
  const {sender, receiver} = route;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    registerSocket(sender, receiveMessage);
  }, []);

  const receiveMessage = message => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleSendMessage = () => {
    if (message !== '') {
      sendMessage(sender, receiver, message);
      setMessage('');
    }
  };

  const handleReadMessage = messageId => {
    readMessage(messageId);
  };

  return (
    <SafeAreaView>
      <Text>Chatting with {receiver}</Text>
      <View>
        {messages.map(message => (
          <View key={message._id}>
            <Text>
              {message.sender}: {message.content}
            </Text>
            {!message.read && message.receiver === sender && (
              <Button
                title="Mark as Read"
                onPress={() => handleReadMessage(message._id)}
              />
            )}
          </View>
        ))}
      </View>
      <View>
        <TextInput value={message} onChangeText={setMessage} />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
