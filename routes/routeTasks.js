const express = require("express");
const Router = express.Router();
const { homePage, homePageStatic, products } = require("../controllers/logic");

Router.get("/", homePage);
Router.get("/static", homePageStatic);
Router.get("/api/v1/products", products);

module.exports = Router;
