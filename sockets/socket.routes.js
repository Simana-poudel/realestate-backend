
const TypingController = require("./socket.controllers/TypingController");

exports.sockets = (socket) => {
     
  // Handle incoming events from the client
  socket.on('send-message', ({message, roomId}) => {
    let skt = socket.broadcast
    skt = roomId ? skt.to(roomId) : skt;
  skt.emit("message-from-server", {message});
  });

  // Handle incoming events from the client
  socket.on('typing', ({roomId}) => {
    let skt = this.socket.broadcast
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-from-server");
});

  // Handle incoming events from the client
  socket.on('typing-stopped', ({roomId}) => {
    let skt = this.socket.broadcast
    skt = roomId ? skt.to(roomId) : skt;
  skt.emit("typing-stopped-from-server");
    });

    // Handle incoming events from the client
  socket.on('join-room', ({roomId}) => {
    socket.join(roomId);
    });

  socket.on('disconnect', () => {
    console.log('A user disconnected',socket.id);
  });

}

