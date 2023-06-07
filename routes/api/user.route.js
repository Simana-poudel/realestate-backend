const express = require("express");
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
} = require("../../controller/user.controller");

const router = express.Router();

router.get('/', getUsers);

router.get('/:userId',getUser)

router.post("/signup", registerUser);

router.post('/login', loginUser);

module.exports = router;
