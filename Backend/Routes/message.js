import express from 'express';
import Message from '../Models/message.js';

const messageRouter = express.Router();

//new message
messageRouter.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user chat
messageRouter.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get count of unread messages
messageRouter.get('/unread/:conversationId', async (req, res) => {
  try {
    const {conversationId} = req.params;
    const {sender} = req.query;

    const unreadMessageCount = await Message.countDocuments({
      sender,
      conversationId,
      read: false,
    });
    res.status(200).json(unreadMessageCount);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get last message
messageRouter.get('/last/:conversationId', async (req, res) => {
  try {
    const {conversationId} = req.params;
    const lastMessage = await Message.findOne({
      conversationId,
    }).sort({createdAt: -1});
    console.log('last msg', lastMessage);
    res.status(200).json(lastMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

export {messageRouter};
