const homePageStatic = (req, res) => {
  // throw new Error("Testing Express Async Error package");
  res.status(200).json({ msg: "Static Data Testing" });
};

const products = async (req, res) => {
  const storeData = null;
  res.status(200).json({ data: "Products Loading Soon!" });
};

module.exports = { homePageStatic, products };
