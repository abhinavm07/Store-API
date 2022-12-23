const express = require("express");
const Router = express.Router();
const {
  homePage,
  homePageStatic,
  products,
  deleteEntry,
} = require("../controllers/logic");

//general route to test
Router.get("/", homePage);
Router.get("/api/v1/static", homePageStatic);
Router.get("/api/v1/products", products);
Router.delete("/api/v1/products/:id", deleteEntry);

module.exports = Router;
