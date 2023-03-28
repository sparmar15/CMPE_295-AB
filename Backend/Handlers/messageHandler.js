// Function to handle incoming messages from the client
export function handleMessage(socket, data) {
  const message = new Message(data);
  message.save(err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Message saved: ${message}`);
      socket.emit('message-received', message);
    }
  });
}

// // Function to handle outgoing messages to the client
export function sendMessages(socket, recipient) {
  Message.find({recipient}, (err, messages) => {
    if (err) {
      console.error(err);
    } else {
      socket.emit('messages', messages);
    }
  });
}
