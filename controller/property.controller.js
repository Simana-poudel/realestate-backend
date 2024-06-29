const { uploadImage } = require("../middlewares/multerUpload");
const Property = require("../model/property.model");
const PropertyDocument = require("../model/propertyDocument.model");

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
    const property = await Property.findOne({ _id: id }).populate("user"); // added
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
        console.error("Error occurred while uploading images:", err);
        return res
          .status(500)
          .json({ error: "Error occurred while uploading images" });
      }

      // Access the uploaded files using req.files
      const images = req.files.map((file) => ({
        name: file.originalname,
        imageUrl: file.path, // Cloudinary URL for the uploaded image
      }));

      const {
        userId,
        propertyType = "house",
        title = "",
        description = "",
        price = 0,
        district = "",
        city = "",
        size = 0,
        area = 0,
        rooms = 0,
        parkingSpace = 0,
        kitchen = 0,
        bedroom = 0,
        diningRoom = 0,
        hall = 0,
        bathroom = 0,
        noOfFloors = 0,
        builtYear = 0,
        usedArea = 0,
        latitude,
        longitude,
      } = req.body;

      if (!latitude || !longitude) {
        return res
          .status(400)
          .json({ error: "Latitude and Longitude are required" });
      }

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
        coordinates: coordinatesJson,
        propertyImage: images, // Assign the uploaded images to the propertyImage field
      });

      // Save the new property info
      const savedProperty = await newProperty.save();

      res.status(201).json({
        message: "Property created successfully",
        data: savedProperty,
      });
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: `Error occurred: ${error.message}` });
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
    const { propertyDocumentId } = req.params;

    // Find the property document by propertyId and delete it
    const deletedProperty = await Property.findByIdAndDelete(propertyId);
    const deletedPropertyDocument = await PropertyDocument.findByIdAndDelete(
      propertyDocumentId
    );

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error Occurred: ${error}` });
  }
};
