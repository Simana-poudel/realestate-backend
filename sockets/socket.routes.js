// // socket.js

const socketIO = require('socket.io');
// const { handleTyping, handleTypingStopped } = require('./socket.controllers/TypingController'); // Import the controller functions
// const { handleJoinRoom, handleNewRoomCreated, handleRoomDeleted } = require('./socket.controllers/RoomControllers'); // Import the controller functions
// const { handleSendMessage, handleUpload } = require('./socket.controllers/MessageController');


const initSocketIO = (server) => {
  const io = socketIO(server, {
    pingTimeout:6000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);


    socket.on("setup", (userData) => {
        socket.join(userData.userId);
        console.log("user id is", userData.userId);
        socket.emit("connected");
      });
    
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        console.log('new message')
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
    
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData.userId);
      });




//     // Handle incoming events from the client
//     socket.on('send-message', ({ message, roomId }) => {
//       handleSendMessage({message, roomId}, socket);
//     });

//     // Handle typing event using the controller function
//     socket.on('typing', ({ roomId }) => {
//       handleTyping({ roomId }, socket);
//     });

//     // Handle typing-stopped event using the controller function
//     socket.on('typing-stopped', ({ roomId }) => {
//       handleTypingStopped({ roomId }, socket);
//     });

//     // Handle incoming events from the client
//     socket.on('join-room', ({ roomId }) => {
//       handleJoinRoom({roomId}, socket);
//     });

//     socket.on('new-room-created', ({ roomId, userId }) => {
//       handleNewRoomCreated({roomId, userId}, socket);
//     });

//     socket.on('upload', ({ data, roomId }) => {
//       handleUpload({data, roomId}, socket);
//     });

//     socket.on('room-removed', ({ roomId }) => {
//       handleRoomDeleted({roomId}, socket);
//     });
    

//     socket.on('disconnect', () => {
//       console.log('A user disconnected', socket.id);
//     });
  });
};

module.exports = { initSocketIO };
