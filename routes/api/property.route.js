const express = require("express");
const {
  getProperties,
  getProperty,
  postProperty,
  updateProperty,
  deleteProperty,
} = require("../../controller/property.controller");

const router = express.Router();

/**
 * @swagger
 * /api/property:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get("/", getProperties);
router.get("/:propertyId", getProperty);

router.post("/", postProperty);
router.put("/:propertyId", updateProperty);

router.delete("/:propertyId", deleteProperty);

module.exports = router;
