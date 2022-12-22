const { query } = require("express");
const productModel = require("../model/products");

const homePage = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Good Job Man ! You're Doing Great" });
};

const homePageStatic = async (req, res) => {
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
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
    console.log(queryObj);
  }
  let results = productModel.find(queryObj);
  if (sort) {
    const sortLst = sort.split(",").join(" ");
    results = results.sort(sortLst);
  } else {
    results = results.sort("createdAt");
  }

  if (fields) {
    const fieldsLst = fields.split(",").join(" ");
    results = results.select(fieldsLst);
  }

  //.skip skips the number of items from the database while limit limits the amount of data supplied to the frontend at a given time.  (read Mongoose docx if confused)

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  results = results.skip(skip).limit(limit);
  const products = await results;

  // console.log(products);
  res.status(200).json({ msg: products, nbHits: products.length });
};

const products = async (req, res) => {
  const products = await productModel
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
