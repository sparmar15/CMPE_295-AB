import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const registerSocket = (userId, receiveMessageCallback) => {
  socket.emit('registerUser', userId);

  socket.on('receive_message', message => {
    receiveMessageCallback(message);
  });
};

const sendMessage = (sender, receiver, content) => {
  socket.emit('send_message', {sender, receiver, content});
};

const readMessage = messageId => {
  socket.emit('read_message', messageId);
};

export {registerSocket, sendMessage, readMessage};
