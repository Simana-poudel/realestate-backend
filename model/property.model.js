const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  propertyType: {
    type: String,
    enum:['land', 'house'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  parkingSpace: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  kitchen: {
    type: Number,
    required: true
  },
  bedroom: {
    type: Number,
    required: true
  },
  diningRoom: {
    type: Number,
    required: true
  },
  hall: {
    type: Number,
    required: true
  },
  bathroom: {
    type: Number,
    required: true
  },
  noOfFloors: {
    type: Number,
    required: true
  },
  builtYear: {
    type: Number,
    required: true
  },
  usedArea: {
    type: Number,
    required: true
  },
  propertyImage: {
    type: String, // Assuming you store the image URL as a string
    required: false
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;