const productModel = require("../model/products");

const homePage = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Good Job Man ! You're Doing Great" });
};

const homePageStatic = async (req, res) => {
  const { featured } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  const products = await productModel.find(queryObj);
  console.log(products);
  res.status(200).json({ msg: products });
};

const products = async (req, res) => {
  const productData = await productModel.find({});
  res.status(200).json({ data: productData, nbHits: productData.length });
};

module.exports = { homePage, homePageStatic, products };
