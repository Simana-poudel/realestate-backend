const express = require("express");
const {
  getPropertyDoc,
  postPropertyDoc,
  updatePropertyDoc,

} = require("../../controller/propertyDocument.controller");

const router = express.Router();

router.get("/", getPropertyDoc);
router.post("/", postPropertyDoc);
router.put("/", updatePropertyDoc);

module.exports = router;
