const express = require("express");
const Router = express.Router();
const { homePageStatic, products } = require("../controllers/logic");

Router.get("/static", homePageStatic);
Router.get("/api/v1/products", products);

module.exports = Router;
