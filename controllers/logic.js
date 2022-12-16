const productModel = require("../model/products");

const homePage = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Good Job Man ! You're Doing Great" });
};

const homePageStatic = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Static Data Testing" });
};

const products = async (req, res) => {
  const productData = await productModel.find({ featured: true });
  res.status(200).json({ data: productData, nbHits: productData.length });
};

module.exports = { homePage, homePageStatic, products };
