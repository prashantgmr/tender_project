const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  ProjectTitle: {
    type: String,
    trim: true,
    required: [true, 'Please enter the project title']
  },
  IFBNo: {
    type: String,
    required: [true, 'Please enter IFB No']
  },
  Procurement: {
    type: String,
    required: [true, 'Please enter Procurement']
  },
  PublicEntity: {
    type: String,
    required: [true, 'Please enter Public Ethnicity']
  },
  PublicAddress: {
    type: String,
    required: [true, 'Please enter Public Address']
  },
  noticepubdate: {
    type: String,
    required: [true, 'Please select the notice publication date']
  },
  bidsubdate: {
    type: String,
    required: [true, 'Please select the bid submission date']
  },
  dateAD: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  // imageFile: {
  //   type: String,
  //   required: [true, 'Please upload a photo']
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = mongoose.model('News', NewsSchema);