const express = require("express");

const router=express.Router()

const userRouter= require("./api/user.route")
const propertyRouter= require("./api/property.route")
const offerpropertyRouter= require("./api/offerproperty.route")
const propertyDocumentRouter= require("./api/propertyDocument.route")
const roomRouter = require("./api/room.route");

router.use('/user',userRouter)
router.use('/property',propertyRouter)
router.use('/offerproperty',offerpropertyRouter)
router.use('/propertydocument',propertyDocumentRouter)
router.use('/room', roomRouter)

module.exports = router