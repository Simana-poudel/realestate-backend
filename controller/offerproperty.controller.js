const nodemailer = require("nodemailer");
const{ uploadImage } = require('../middlewares/multerUpload');
const OfferProperty = require("../model/offeredproperty.model");
const { SetErrorResponse } = require("../utils/responseSetter");
const { sendOfferEmailToSeller } = require("../utils/offermail");

exports.getOfferProperties = async (req, res) => {
  try {
    const properties = await OfferProperty.find({});
    res.json({ data: properties }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occurred, ${e}` }).status(500);
  }
};

exports.getOfferProperty = async (req, res) => {
    try {
      const id = req.params?.offerpropertyId;
      const property = await OfferProperty.findOne({ _id: id }).populate('user');// added
      res.json({ data: property }).status(200);
    } catch (e) {
      console.log(e);
      res.json({ error: `Error Occured, ${e}` }).status(500);
    }
  };

exports.postOfferProperty = async (req, res) => {
  try {
    // Invoke the uploadImage middleware to handle the image uploads
    uploadImage(req, res, async function (err) {
      if (err) {
        // An error occurred while uploading
        console.log(err);
        return res.status(500).json({ error: 'Error occurred while uploading images' });
      }

      // Access the uploaded files using req.files
      const images = req.files.map((file) => {
        const fileName = file.originalname; // Concatenate date and original name to create the filename
        const filePath = 'http://127.0.0.1:8080/' + fileName; // Concatinate path and filename to create the full file path

        return {
          name: filePath,
          image: {
            data: file.buffer,
            contentType: file.mimetype
          }
        };
      });

      const {
        userId,
        propertyId,
        propertyType,
        title,
        description,
        message,
        price,
        district,
        city,
        size,
        area,
        rooms,
        parkingSpace,
        kitchen,
        bedroom,
        diningRoom,
        hall,
        bathroom,
        noOfFloors,
        builtYear,
        usedArea
      } = req.body;

      // Create a new property information with the uploaded images
      const newProperty = new OfferProperty({
        user: userId,
        property: propertyId,
        propertyType,
        title,
        description,
        message,
        price,
        district,
        city,
        size,
        area,
        rooms: rooms || 0,
        parkingSpace: parkingSpace || 0,
        kitchen: kitchen || 0,
        bedroom: bedroom || 0,
        diningRoom: diningRoom || 0,
        hall: hall || 0,
        bathroom: bathroom || 0,
        noOfFloors: noOfFloors || 0,
        builtYear: builtYear || 0,
        usedArea: usedArea || 0,
        propertyImage: images // Assign the uploaded images to the propertyImage field
      });

      // Save the new property info
      const savedProperty = await newProperty.save();

      res.status(201).json({ data: savedProperty });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error Occurred: ${error}` });
  }
};


exports.fixMeetingController = async (req, res) => {
  try {
    const { email, url, subject } = req.body;


    const sendEmail = await sendOfferEmailToSeller({
      email,
      url,
      subject: "Greetings, Sellby. ",
    });
    if (!sendEmail) throw new SetErrorResponse("Couldn't send email", 500);

    return res.success(
      { email },
      `Your messege was send to seller.`
    );
  } catch (err) {
    return res.fail(err);
  }
};