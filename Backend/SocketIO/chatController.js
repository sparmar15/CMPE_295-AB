import Chat from '../Models/message.js';

export const updateChat = async (senderId, receiverId, message) => {
  try {
    // Find the chat object based on senderId and receiverId
    const chat = await Chat.findOne({
      $or: [
        {user1: senderId, user2: receiverId},
        {user1: receiverId, user2: senderId},
      ],
    });

    if (!chat) {
      // If chat object doesn't exist, create a new one
      const newChat = await Chat.create({
        user1: senderId,
        user2: receiverId,
        messages: [{sender: senderId, content: message}],
      });
      return newChat;
    } else {
      // If chat object exists, add the new message to the messages array
      chat.messages.push({sender: senderId, content: message});
      const updatedChat = await chat.save();
      return updatedChat;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllChats = async userId => {
  const chats = await Chat.aggregate([
    {
      $match: {
        $or: [{user1: userId}, {user2: userId}],
      },
    },
    {
      $unwind: '$messages',
    },
    {
      $sort: {
        'messages.timestamp': -1,
      },
    },
    {
      $limit: 1,
    },
  ]);
  return chats;
};

export const getChatsBetweenUsers = async (user1Id, user2Id) => {
  try {
    const chats = await Chat.find({
      $or: [
        {user1: user1Id, user2: user2Id},
        {user1: user2Id, user2: user1Id},
      ],
    }).sort({'messages.timestamp': -1});

    return chats;
  } catch (err) {
    console.log(err);
    return null;
  }
};
