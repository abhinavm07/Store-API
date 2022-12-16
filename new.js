const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name Can't be Empty"],
  },
  price: {
    type: String,
    require: [true, "Price Can't be Empty"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "macros"],
      messege: "{VALUE} is not Avaliable",
    },
    // enum: ["ikea", "liddy", "caressa", "macros "],
  },
});

module.exports = mongoose.model("Product", productSchema);
