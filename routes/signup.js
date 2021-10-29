const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserLogin = require("../db-model/userSchema.js");

mongoose.connect("mongodb://localhost/UserLoginDB");

// console.log(UserLogin);
// console.log(mongoose.model("UserLoginInfo")); //How I named the model

//

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

// Place to store user info - until we learn mongoDB.
// const users = require("../database/userInfo.json");
// //Connect to the database
// mongoose.connect("mongodb://localhost/")

// // Add new user to database

// async function encryptPassword(user) {
//   console.log("encrpying password");
//   const salt = await bcrypt.genSalt();
//   user.password = await bcrypt.hash(user.password, salt);
// }

// router.post("/create", (req, res) => {
//   let user = req.body;

//   //Have to push the use a then b/c we have a promise.
//   encryptPassword(user).then(() => {
//     console.log("password encrypted.");
//     users.push(user);
//     fs.writeFile("../database/userInfo.json", JSON.stringify(users), (err) => {
//       // Checking for errors
//       if (err) throw err;
//       console.log("Done writing"); // Success
//     });
//   });

//   res.redirect("/signup");
// });

module.exports = router;
