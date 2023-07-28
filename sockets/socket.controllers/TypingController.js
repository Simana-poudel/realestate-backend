module.exports = class TypingController {
    socket;
    constructor(socket){
        this.socket = socket;
    }
    
    typingStarted = ({roomId}) => {
        let skt = this.socket.broadcast
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-from-server");
    };
    
    typingStopped =({roomId}) => {
        let skt = this.socket.broadcast
        skt = roomId ? skt.to(roomId) : skt;
      skt.emit("typing-stopped-from-server");
        };
}


