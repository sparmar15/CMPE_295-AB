import {Server} from 'socket.io';
import Message from '../Models/message.js';
import {
  updateChat,
  getAllChats,
  getChatsBetweenUsers,
} from './chatController.js';

const initSocket = server => {
  const io = new Server(server);
  const userSockets = new Map(); // Maps user IDs to socket IDs
  let connectionCount = 0;

  io.on('connection', socket => {
    connectionCount++;
    console.log(connectionCount, '  User connected:', socket.id);

    socket.on('registerUser', async userId => {
      userSockets.set(userId, socket.id);
      console.log('User registered: ', userId, socket.id);

      // const received1 = await Chat.find({
      //   $or: [{user1: userId}, {user2: userId}],
      // });
      // console.log(received1[0].messages);
      // if (received1) {
      //   io.to(userSockets.get(userId)).emit(
      //     'receive_message',
      //     received1[0].messages,
      //   );
      // }
      // const chats = await getAllChats(userId);
      // if (chats) {
      //   io.to(userSockets.get(userId)).emit('receive_message', chats);
      // }
    });

    // Listen for send_message event and save message to database
    socket.on('send_message', async (message, friendId) => {
      try {
        // Send only when receipient is online
        // console.log(message, friendId);

        if (userSockets[friendId]) {
          // console.log(chat);
          io.to(userSockets[friendId]).emit('receive_message', message); // Send only to recipient's socket
        }
      } catch (err) {
        console.log(err);
      }
    });

    // Listen for read_message event and update message status in database
    socket.on('read_message', async conversationId => {
      try {
        const result = await Message.updateMany(
          {conversationId},
          {$set: {read: true}},
        );

        // console.log(`${result.nModified} messages updated as read`);
      } catch (error) {
        console.error(error);
      }
    });

    // socket.on('get_messages', async ({sender, receiver}) => {
    //   try {
    //     // Send only when receipient is online
    //     const chats = await getChatsBetweenUsers(sender, receiver);
    //     console.log('Inside get_messages', chats[0].messages);
    //     // if (userSockets[sender]) {
    //     io.to(userSockets[sender]).emit('all_messages', chats[0].messages);
    //     // }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
    // socket.on('all_messages', messages => {
    //   console.log('jkdfsajkldfsajkl;adfskjl;dsfajkl');
    // });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      userSockets.delete(socket.id);
    });
  });
};

export default initSocket;
