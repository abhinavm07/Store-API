const express = require("express");
const Router = express.Router();
const { homePage, products } = require("../controllers/logic");

Router.get("/", homePage);
Router.get("/api/v1/data", products);

module.exports = Router;
