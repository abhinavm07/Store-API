const { query } = require("express");
const productModel = require("../model/products");

const homePage = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Good Job Man ! You're Doing Great" });
};

const products = async (req, res) => {
  // the constant below only takes in featured as input from the query, everything else is ignored
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
    //regex le chai name same to same nabhayeni edi data ma search gareko element xa bhanye dekhauxa Example: req.query ma "Abhi" aayo bhanye resunts ma Abhinab, abhii, abhinavv testo aauxa (just "abhi include bha hunu paryo"), option i ko mathlabh case insensative ho
    //mongoose docs herney confuse bhayema
    queryObj.name = { $regex: name, $options: "i" };
  }

  //Documentation Necessay
  if (numericFilters) {
    //to convert input taken from user into mongoose filters to filter data from database
    const operatorMap = {
      ">": "$gt", //greater than
      ">=": "$gte", //greater than equal to
      "=": "$eq", //equals to
      "<": "$lt", //less than
      "<=": "$lte", //less than equal to
    };
    //\b is a zero width assertion. That means it does not match a character, it matches a position with one thing on the left side and another thing on the right side.
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    //filter replaces expression matched from regex with the corresponding value in operator map.
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-` //match is a callback function which returns matched value from the object
    );
    //options are the only ons for which we can use numeric filter (since they are the only ones which have numeric values)
    const options = ["price", "rating"];
    //here the filter splits the query with the , and gives us two expressions
    // and for each item  it assigns value that has been split with field, operator and value from the expression before or after "-"
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      //here if the field provided is included in options than example queryObj[price] ={[$gt]:Number(40)}
      if (options.includes(field)) {
        //operator big brackett ma halena bhanye value lidaina
        queryObj[field] = { [operator]: Number(value) };
        console.log(operator);
      }
    });
    console.log(queryObj);
  }
  let results = productModel.find(queryObj);
  if (sort) {
    // .sort helps us to sort data inorder according to the users input
    const sortLst = sort.split(",").join(" ");
    results = results.sort(sortLst);
  } else {
    results = results.sort("createdAt");
  }

  if (fields) {
    const fieldsLst = fields.split(",").join(" ");
    //.select only returns the values of the fields provided from the user
    results = results.select(fieldsLst);
  }

  //.skip skips the number of items from the database while limit limits the amount of data supplied to the frontend at a given time.  (read Mongoose docx if confused)

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  //.skip skips the number of items while .limit limits a number of outcomes to come from the database
  results = results.skip(skip).limit(limit);
  const products = await results;

  // console.log(products);
  res.status(200).json({ msg: products, nbHits: products.length });
};

const homePageStatic = async (req, res) => {
  const products = await productModel
    //find helps us find an item in a static db
    .find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ data: products, nbHits: products.length });
};

const deleteEntry = async (req, res) => {
  const { id: productID } = req.params;
  const products = await productModel.findByIdAndDelete({ _id: productID });
  res
    .status(200)
    .json({ msg: `Item with id ${productID} deleted Sucessfully` });
};

module.exports = { homePage, homePageStatic, products, deleteEntry };
