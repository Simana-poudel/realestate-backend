const Room = require("../model/room.model");

exports.getRooms = async (req, res) => {
  try {
    console.log("rooms");
    const rooms = await Room.find({});
    res.json({ data: rooms }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occured, ${e}` }).status(500);
  }
};
