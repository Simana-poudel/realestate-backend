const express = require("express");
const { sendMessage, allMessages } = require("../../controller/message.controller");
const { checkAuthValidation } = require("../../middlewares/authentication");

const router = express.Router();

router.get(
    '/:chatId',
    checkAuthValidation,
     allMessages
     );

router.post(
    '/',
    checkAuthValidation,
    sendMessage
    );

module.exports = router;
