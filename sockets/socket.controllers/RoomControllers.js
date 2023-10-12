// const Room = require('../../model/room.model');

// // Handle incoming events from the client
// const handleJoinRoom = ({ roomId }, socket) => {
//     console.log('join room', roomId);
//     socket.join(roomId);

//   };

//   // Handle incoming events from the client
// const handleNewRoomCreated = ({ roomId,userId }, socket) => {
//     const room = new Room({
//       name: 'test',
//       roomId: roomId,
//       userId: userId,
//     })
//     room.save();
//     socket.emit('new-room-created', { room });
//     console.log('roomcreated')


//   };

//   const handleRoomDeleted = async ({ roomId }, socket) => {
//     await Room.deleteOne({ roomId: roomId});
    
//     socket.emit("room-removed", {roomId});
//     console.log('roomremoved')
//   };

//   module.exports = { handleJoinRoom, handleNewRoomCreated, handleRoomDeleted};
  

