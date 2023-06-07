const express = require("express");

const router=express.Router()

const userRouter= require("./api/user.route")
const propertyRouter= require("./api/property.route")
const propertyDocRouter= require("./api/propertyDocument.route")


router.use('/user',userRouter)
router.use('/property',propertyRouter)


module.exports = router