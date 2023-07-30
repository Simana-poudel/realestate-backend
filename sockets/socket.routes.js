// socket.js

const socketIO = require('socket.io');
const { handleTyping, handleTypingStopped } = require('./socket.controllers/TypingController'); // Import the controller functions
const { handleJoinRoom, handleNewRoomCreated } = require('./socket.controllers/RoomControllers'); // Import the controller functions
const { handleSendMessage } = require('./socket.controllers/MessageController');


const initSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);


    // Handle incoming events from the client
    socket.on('send-message', ({ message, roomId }) => {
      handleSendMessage({message, roomId}, socket);
    });

    // Handle typing event using the controller function
    socket.on('typing', ({ roomId }) => {
      handleTyping({ roomId }, socket);
    });

    // Handle typing-stopped event using the controller function
    socket.on('typing-stopped', ({ roomId }) => {
      handleTypingStopped({ roomId }, socket);
    });

    // Handle incoming events from the client
    socket.on('join-room', ({ roomId }) => {
      handleJoinRoom({roomId}, socket);
    });

    socket.on('new-room-created', ({ roomId }) => {
      handleNewRoomCreated({roomId}, socket);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected', socket.id);
    });
  });
};

module.exports = { initSocketIO };
