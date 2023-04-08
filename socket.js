import io from 'socket.io-client';
import {logger} from 'react-native-logs';
const Log = logger.createLogger();

const socket = io('http://localhost:3000');

const registerSocket = userId => {
  socket.emit('registerUser', userId);

  // socket.on('receive_message', message => {
  //   receiveMessageCallback(message);
  // });
};

// const getMessages = (user1, user2, receiveMessageCallback) => {
//   socket.emit('get_messages', {sender: user1, receiver: user2});
//   Log.info('message', user1);
//   socket.on('all_messages', message => {
//     // receiveMessageCallback(message);
//   });
// };

const getMessage = getMessageCallback => {
  socket.on('receive_message', message => {
    getMessageCallback(message);
  });
};

const sendMessage = (message, friendId) => {
  socket.emit('send_message', message, friendId);
};

const readMessage = conversationId => {
  socket.emit('read_message', conversationId);
};

export {registerSocket, sendMessage, readMessage, getMessage};
