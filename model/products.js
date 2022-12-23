const mongoose = require("mongoose");

//schema gives structure to the database
const productSchema = new mongoose.Schema({
  //here name must be a string and should be required, if not response: "Name Can't be Empty"
  name: {
    type: String,
    require: [true, "Name Can't be Empty"],
  },
  price: {
    type: String,
    require: [true, "Price Can't be Empty"],
  },
  //default refers to static value if not provided
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    //date.now is the current date
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      messege: "{VALUE} is not Avaliable",
    },
    // enum: ["ikea", "liddy", "caressa", "macros "],
  },
});
// this exports the data from database as Product with the schema(structre) of productSchema
module.exports = mongoose.model("Product", productSchema);
