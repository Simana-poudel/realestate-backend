const PropertyDocument = require('../model/propertyDocument.model');
const jwt = require("express-jwt");

exports.getPropertyDoc = async (req, res) => {
    try {
        const { _id } = req.body;
        const propertyDocument = await PropertyDocument.findOne({ _id: _id });
        res.json({ data: propertyDocument }).status(200);
    } catch (e) {
      console.log(e);
      res.json({ error: `Error Occured, ${e}` }).status(500);
    }
  };

exports.postPropertyDoc = async (req, res) => {
  try {
    const {
      property,
      documentType,
      documentImage
    } = req.body;

    // Create a new property document
    const newPropertyDoc = new PropertyDocument({
      property,
      documentType,
      documentImage
    });

    // Save the new property document
    const savedPropertyDoc = await PropertyDocument.save();

    res.status(201).json({ data: savedPropertyDoc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Error Occurred: ${error}` });
  }
};

exports.updatePropertyDoc = async (req, res) => {
    try {
      const { propertyDocumentId } = req.params;
      const updatedPropertyDocumentData = req.body;
  
      // Find the existing property document by propertyId and update its data
      const updatedPropertyDocument = await PropertyDocument.findByIdAndUpdate(
        propertyDocumentId,
        updatedPropertyDocumentData,
        { new: true }
      );
  
      if (!updatedPropertyDocument) {
        return res.status(404).json({ error: "Property not found" });
      }
  
      res.status(200).json({ data: updatedPropertyDocument });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Error Occurred: ${error}` });
    }
  };

