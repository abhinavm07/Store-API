require("dotenv").config();

const connectDB = require("./db/connect");
const productSchema = require("./model/products");
const products = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await productSchema.deleteMany();
    await productSchema.create(products);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
