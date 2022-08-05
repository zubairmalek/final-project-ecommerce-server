const router = require("express").Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");

//GET USER INFO
router.get("/my-account", (req, res, next) => {
  console.log(req.payload);
  const id = req.payload._id;
  User.findById(id).then((data) => {
    res.json(data);
  });
});

//EDIT USER INFO
router.put("/my-account/:id/edit", (req, res, next) => {
  const { email, username } = req.body;
  const { id } = req.params;
  User.findByIdAndUpdate(id, { email, username }, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//DELETE USER

router.post("/my-account/:id/delete", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
