const router = require("express").Router();
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET ALL PRODUCTS
router.get("/products", (req, res, next) => {
  Product.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//CREATE A NEW PRODUCT
router.post("/products", isAuthenticated, (req, res, next) => {
  const { price, title, description } = req.body;
  Product.create({ price, title, description })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//READ ONE PRODUCT WITH ID
router.get("/products/:id", (req, res, next) => {
  const { id } = req.params;
  console.log("my id is", id);
  Product.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// EDIT PRODUCT

router.put("/products/:id/edit", isAuthenticated, (req, res, next) => {
  const { price, title, description } = req.body;
  const { id } = req.params;
  Product.findByIdAndUpdate(id, { price, title, description }, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE PRODUCT

router.post("/products/:id/delete", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => {
      Product.find()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
