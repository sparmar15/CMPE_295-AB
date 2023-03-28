import {Server} from 'socket.io';
import Message from './Models/message.js';

const initSocket = server => {
  const io = new Server(server);
  const userSockets = new Map(); // Maps user IDs to socket IDs

  io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('registerUser', async userId => {
      console.log('User registered: ', userId);
      userSockets.set(userId, socket.id);
      const received1 = await Message.find({read: false, receiver: userId});
      console.log(received1);
      if (received1.length > 0) {
        for (let i = 0; i < received1.length; i++) {
          io.to(userSockets.get(userId)).emit('receive_message', received1[i]);
        }
      }
    });

    // Listen for send_message event and save message to database
    socket.on('send_message', async ({sender, receiver, content}) => {
      try {
        // Send only when receipient is online
        if (userSockets[receiver]) {
          const message = await Message.create({sender, receiver, content});
          io.to(userSockets[receiver]).emit('receive_message', message); // Send only to recipient's socket
        } else {
          // If recipient is offline then save the unfetched messaged in DB with 'read' flag set as false.
          const undeliveredMsg = await Message.create({
            sender,
            receiver,
            content,
            read: false,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });

    // Listen for read_message event and update message status in database
    socket.on('read_message', async messageId => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          {$set: {read: true}},
          {new: true},
        );
        console.log(updatedMessage);
        // io.emit('message_read', updatedMessage._id); // Broadcast to all clients including the sender and receiver
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      userSockets.delete(socket.id);
    });
  });
};

export default initSocket;
