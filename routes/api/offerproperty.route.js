const express = require("express");
const {
  getOfferProperty,
  postOfferProperty,
  getOfferProperties,
  fixMeetingController
} = require("../../controller/offerproperty.controller");

const router = express.Router();


router.get("/:offerpropertyId", getOfferProperty);

router.post("/", postOfferProperty);
router.get("/", getOfferProperties);
router.post("/fixmeeting", fixMeetingController);



module.exports = router;
