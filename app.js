const express = require("express");
const app = express();
const dotenv = require("dotenv");

//yo bina .env ma dherai errors aaudaxa
dotenv.config();
// helps to handle asyc errors without using extra middlewares
require("express-async-errors");

const notfoundMiddleware = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/connect");
// edi .env ma Port bhannye variable ma port diyiyeko xaina bhanye port 8000 hunxa
const port = process.env.Port || 8000;
const route = require("./routes/routeTasks");

// helps to parse json object from req.body, yo bhayena bhanye req.body ko json object postman bata lina mildaina
app.use(express.json());

app.use("/", route);

app.use(notfoundMiddleware);
app.use(errorHandler);

const launch = async () => {
  try {
    //awaits to connect to the database via the url provided in the .env file as MONGO_URI
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
