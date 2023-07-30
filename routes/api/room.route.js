const express = require("express");
const { getRooms } = require('../../controller/room.controller');

const router = express.Router();

router.get('/', getRooms)

module.exports = router;
