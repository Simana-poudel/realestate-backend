const express = require("express");
const {
  getOfferProperty,
  postOfferProperty,
  fixMeetingController
} = require("../../controller/offerproperty.controller");

const router = express.Router();

router.get("/:offerpropertyId", getOfferProperty);

router.post("/", postOfferProperty);
router.post('/fixmeeting', fixMeetingController)

module.exports = router;
