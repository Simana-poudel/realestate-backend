const Room = require('../../model/room.model');

// Handle incoming events from the client
const handleJoinRoom = ({ roomId }, socket) => {
    console.log('join room', roomId);
    socket.join(roomId);

  };

  // Handle incoming events from the client
const handleNewRoomCreated = ({ roomId }, socket) => {
    const room = new Room({
      name:'Test',
      roomId: roomId
    })
    room.save();
    socket.broadcast.emit('new-room-created', { roomId });

  };


  
  module.exports = { handleJoinRoom, handleNewRoomCreated};
  

