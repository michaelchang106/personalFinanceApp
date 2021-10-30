const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserLoginDB = require("../database/userSchema.js");

mongoose.connect("mongodb://localhost/UserLoginDB");

// console.log(UserLoginDB);
// console.log(mongoose.model("UserLoginDB")); //How I named the model

//

/* Renders the signUp page*/
router.get("/", function (req, res) {
  res.render("signUp");
});

//Save user info.
router.post("/create", async (req, res) => {
  const record = req.body;
  console.log(record);
  await UserLoginDB.create(record).catch((err) => {
    res.send("ERROR");
  });
  res.redirect("/");
});

router.get("/getUser", async (req, res) => {
  const record = await UserLoginDB.find({ userID: "cats" });
  res.json(record);
});

// Place to store user info - until we learn mongoDB.
// const users = require("../database/UserLoginDB.json");
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
//     fs.writeFile("../database/UserLoginDB.json", JSON.stringify(users), (err) => {
//       // Checking for errors
//       if (err) throw err;
//       console.log("Done writing"); // Success
//     });
//   });

//   res.redirect("/signUp");
// });

module.exports = router;
