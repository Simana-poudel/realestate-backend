const express = require("express");
const { accessChat, fetchChats } = require('../../controller/chat.controller');
const { checkAuthValidation } = require("../../middlewares/authentication");


const router = express.Router();

router.post(
'/', 
checkAuthValidation,
accessChat);


router.get(
    '/',
    checkAuthValidation,
     fetchChats);



module.exports = router;
