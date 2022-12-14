const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

require("express-async-errors");

const notfoundMiddleware = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/connect");
const port = process.env.Port || 5000;
const route = require("./routes/routeTasks");

app.use("/", route);

app.use(notfoundMiddleware);
app.use(errorHandler);

const launch = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("And We're LIVE !");
    });
    console.log("Hello There");
  } catch (error) {
    console.log(error);
  }
};

launch();
