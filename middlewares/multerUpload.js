const multer = require("multer");
const { storage } = require("../storage/storage");
const upload = multer({ storage });

exports.uploadImage = upload.array("testImage", 10);
