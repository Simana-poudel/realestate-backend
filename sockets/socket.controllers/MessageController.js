
  
// Handle incoming events from the client
const handleSendMessage = ({ message, roomId }, socket) => {
    let skt = socket.broadcast;
      skt = roomId ? skt.to(roomId) : skt;
      skt.emit("message-from-server", { message });
      console.log(message);
    };

  module.exports = { handleSendMessage };
  
  