const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },

});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
