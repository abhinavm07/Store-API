const express = require("express");
const app = express();
const dotenv = require("dotenv");
const notfoundMiddleware = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const port = 5000;
const route = require("./routes/routeTasks");

app.use("/", route);

app.use(notfoundMiddleware);
app.use(errorHandler);

const launch = async () => {
  try {
    app.listen(port, () => {
      console.log("And We're LIVE !");
    });
    console.log("Hello There");
  } catch (error) {
    console.log(error);
  }
};
