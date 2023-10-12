const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  name: {
      type: String,
      require:true
  },
  image: {
      data: Buffer,
      contentType: String
  }
},{_id:false});

const propertyDocumentSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Property',
    required: true
  },
 naksa: [ImageSchema],
 lalpurja: [ImageSchema]

});

const PropertyDocument = mongoose.model('PropertyDocument', propertyDocumentSchema);

module.exports = PropertyDocument;
