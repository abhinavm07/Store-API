const express = require("express");
const Router = express.Router();
const {
  homePage,
  homePageStatic,
  products,
  deleteEntry,
} = require("../controllers/logic");

Router.get("/", homePage);
Router.get("/static", homePageStatic);
Router.get("/api/v1/products", products);
Router.delete("/api/v1/products/:id", deleteEntry);

module.exports = Router;
