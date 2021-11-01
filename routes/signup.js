const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserLogin = require("../db-model/userSchema.js");

mongoose.connect("mongodb://localhost/UserLoginDB");

/* Renders the signup page*/
router.get("/", function (req, res) {
  res.render("signup");
});

//Save user info.
router.post("/create", async (req, res) => {
  const record = req.body;
  console.log(record);
  await UserLogin.create(record).catch((err) => {
    res.send("ERROR");
  });
  res.redirect("/signup");
});

router.get("/getUser", async (req, res) => {
  const record = await UserLogin.find({ userID: "cats" });
  res.json(record);
});


module.exports = router;
