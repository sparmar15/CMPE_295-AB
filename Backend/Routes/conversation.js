import express from 'express';
import Conversation from '../Models/conversation.js';

const conversationRouter = express.Router();

//new conversation
conversationRouter.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conversation of a user
conversationRouter.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {$in: [req.params.userId]},
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

export {conversationRouter};
