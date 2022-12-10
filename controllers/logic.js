const homePage = (req, res) => {
  res.send("Welcome to the Home Page");
};

const products = async (req, res) => {
  const storeData = null;
  res.json({ data: storeData });
};

module.exports = { homePage, products };
