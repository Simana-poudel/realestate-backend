const asyncHandler = require("express-async-handler");
const User = require('../model/user.model')
const Chat = require("../model/chat.model")

//createchat
//finduserchat
//findchat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    try {
      const existingChat = await Chat.findOne({
        users: { $all: [req.user._id, userId] },
      }).populate("users", "-password").populate("latestMessage");
  
      if (existingChat) {
        return res.status(200).json(existingChat);
      }
  
      const chatData = {
        chatName: "sender",
        users: [req.user._id, userId],
      };
  
      const createdChat = await Chat.create(chatData);
      console.log("createdChat:", createdChat); // Add this line

      const fullChat = await Chat.findById(createdChat._id).populate("users", "-password");
      console.log("fullChat:", fullChat); // Add this line

      res.status(200).json(fullChat);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  const fetchChats = asyncHandler(async (req, res) => {
    try {
      const chats = await Chat.find({ users: req.user._id })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });
  
      const populatedChats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "name email",
      });
  
      res.status(200).json(populatedChats);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });



module.exports = { accessChat, fetchChats };
