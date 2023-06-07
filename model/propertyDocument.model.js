


const mongoose = require('mongoose');

const propertyDocumentSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Property',
    required: true
  },
  documentType: {
    type: String,
    required: true
  },
  documentImage: {
    type: String, // Assuming you store the image URL as a string
    required: true
  }
});

const PropertyDocument = mongoose.model('PropertyDocument', propertyDocumentSchema);

module.exports = PropertyDocument;
