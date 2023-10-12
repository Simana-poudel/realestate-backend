// const fs = require('fs');

// // Handle incoming events from the client
// const handleSendMessage = ({ message, roomId }, socket) => {
//     let skt = socket.broadcast;
//       skt = roomId ? skt.to(roomId) : skt;
//       skt.emit("message-from-server", { message });
//       console.log(message);
//     };

//     // Handle incoming events from the client
// const handleUpload = ({ data, roomId }, socket) => {
//     fs.writeFile(
//       "upload/" + "test.png",
//      data, 
//      { encoding: "base64" },
//      () => {}
//      );
//     socket.to(roomId).emit("uploaded", { buffer: data.toString("base64") });
//   }

//   //i am here

//   module.exports = { handleSendMessage, handleUpload };
  
  