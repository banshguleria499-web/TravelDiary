const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  isPublic: {
  type: Boolean,
  default: true
},
  images: {
    type: [String],
    default: []
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Place", placeSchema);