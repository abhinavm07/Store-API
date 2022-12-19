const { query } = require("express");
const productModel = require("../model/products");

const homePage = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Good Job Man ! You're Doing Great" });
};

const homePageStatic = async (req, res) => {
  // the constant below only takes in featured as input from the query, everything else is ignored
  const { featured, company, name } = req.query;
  // here we define a new variable to access it down the line
  const queryObj = {};
  if (featured) {
    //if featured exists queryObj.featured is set as true if featured is true else it returns {}
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  const products = await productModel.find(queryObj);
  // console.log(products);
  res.status(200).json({ msg: products, nbHits: products.length });
};

const products = async (req, res) => {
  const products = await productModel.find({});
  res.status(200).json({ data: products, nbHits: products.length });
};

module.exports = { homePage, homePageStatic, products };
