const{ uploadImage } = require('../middlewares/multerUpload');
const Property = require("../model/property.model");
const PropertyDocument = require('../model/propertyDocument.model');


const jwt = require("express-jwt");

// exports.getPropertyDocumentsController = async (req, res) => {
//   try {
//     const { limit, page, district, city, propertyType } = req.query;

//     // Create the query object based on the provided search parameters
//     const query = {};

//     if (district) {
//       query.district = district;
//     }

//     if (city) {
//       query.city = city;
//     }

//     if (propertyType) {
//       query.propertyType = propertyType;
//     }

//     const data = await getPaginatedData(Property, {
//       pagination: true,
//       query,
//       lean: true,
//       limit,
//       page,
//       modFunction: (data) => {
//         return data;
//       },
//     });

//     res.success(data);
//   } catch (e) {
//     res.fail(e);
//   }
// };

exports.getProperties = async (req, res) => {
  try {
    const { district, city, propertyType } = req.query;

    // Create the query object based on the provided search parameters
    const query = {};

    if (district) {
      query.district = district;
    }

    if (city) {
      query.city = city;
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    const properties = await Property.find(query);
    res.json({ data: properties }).status(200);
  } catch (e) {
    console.log(e);
    res.json({ error: `Error Occurred, ${e}` }).status(500);
  }
};


  exports.getProperty = async (req, res) => {
    try {
      const id = req.params?.propertyId;
      const property = await Property.findOne({ _id: id }).populate('user');// added
      res.json({ data: property }).status(200);
    } catch (e) {
      console.log(e);
      res.json({ error: `Error Occured, ${e}` }).status(500);
    }
  };

exports.postProperty = async (req, res) => {
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
        propertyType,
        title,
        description,
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
        usedArea,
        latitude,
        longitude
      } = req.body;

      const coordinatesJson = [latitude, longitude];


      // Create a new property information with the uploaded images
      const newProperty = new Property({
        user: userId,
        propertyType,
        title,
        description,
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
        coordinates: coordinatesJson,
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

  exports.updateProperty = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const updatedPropertyData = req.body;
  
      // Find the existing property document by propertyId and update its data
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        updatedPropertyData,
        { new: true }
      );
  
      if (!updatedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
  
      res.status(200).json({ data: updatedProperty });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error Occurred: ${error}` });
    }
  };

  exports.deleteProperty = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const {propertyDocumentId} = req.params;
  
      // Find the property document by propertyId and delete it
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
      const deletedPropertyDocument = await PropertyDocument.findByIdAndDelete(propertyDocumentId);

      if (!deletedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
  
      res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error Occurred: ${error}` });
    }
  };




  
  

