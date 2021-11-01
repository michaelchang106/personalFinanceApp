let express = require("express");
let router = express.Router();

// for calculating taxes
const calculateTaxesBackEnd = require("../public/javascripts/incomeTax/backend/calculateTaxesBackEnd.js");

// for login encryption
const bcrypt = require("bcrypt");

// for database connection
const mongoose = require("mongoose");
const userLoginInfo = require("../database/userSchema.js");
const actualBudgetSchema = require("../database/actualBudgetSchema.js");
mongoose.connect("mongodb://localhost/UserLoginDB");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

/* FETCH POST anonIncomePost*/
router.post("/anonIncomePost", function (req, res) {
  console.log("ANONOMYOUS POST INCOME -- POST");
  const anonInfo = req.body;

  const salary = anonInfo.salary;
  const state = anonInfo.state;
  const marital = anonInfo.marital;

  res.json(calculateTaxesBackEnd(salary, marital, state));
});

/* FETCH POST userIncomePost*/
router.post("/userIncomePost", async function (req, res) {
  console.log("USER POST INCOME -- POST");
  const loginInfo = req.body;

  const salary = loginInfo.salary;
  const state = loginInfo.state;
  const marital = loginInfo.marital;

  // query and update definitions
  let query = { userID: loginInfo.userID };
  let update = {
    taxData: {
      salary: loginInfo.salary,
      state: loginInfo.state,
      marital: loginInfo.marital,
    },
  };
  //query and update into database
  await userLoginInfo.findOneAndUpdate(query, update);

  res.json(calculateTaxesBackEnd(salary, marital, state));
});

/* FETCH POST loginPost*/
router.post("/loginPost", async function (req, res) {
  const loginInfo = req.body;

  //check if username exists
  try {
    // grabbing the data using username from MongoDB
    let record = await userLoginInfo.findOne({ userID: loginInfo.username });

    bcrypt.compare(loginInfo.password, record.password, (err, result) => {
      if (result) {
        res.json(record);
      } else {
        res.json({ error: "Password does not match our records" });
      }
    });
  } catch (error) {
    res.json({ error: "User not found" });
  }
});

/* FETCH POST deleteUserIncome*/
router.post("/deleteUserIncome", async function (req, res) {
  console.log("USER DELETE INCOME -- POST");
  const loginInfo = req.body;

  // query and update definitions
  let query = { userID: loginInfo.userID };
  let update = { $unset: { taxData: "" } };
  await userLoginInfo.findOneAndUpdate(query, update);

  res.send();
});

/* FETCH POST actualItemsPost*/
router.post("/actualItemsPost", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- POST");
  const actualItem = req.body;

  // query, update, option definitions
  const query = { userID: actualItem.userID };
  const update = {
    $push: {
      actualItems: {
        vendor: actualItem.vendor,
        date: actualItem.date,
        amount: actualItem.amount,
        category: actualItem.category,
      },
    },
  };
  const options = { new: true, upsert: true };
  try {
    await actualBudgetSchema.findOneAndUpdate(query, update, options);
  } catch {
    res.status();
  }

  let record = await actualBudgetSchema.findOne(query);
  res.json(record);
});

router.post("/actualItemsGet", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- GET");
  const actualItem = req.body;

  // query, update, option definitions
  const query = { userID: actualItem.userID };
  let record;

  try {
    record = await actualBudgetSchema.findOne(query);
  } catch {
    res.status();
  }

  // TRYING TO SORT THE LIST OF ACTUAL ITEMS

  // let actualItems = record.actualItems;
  // console.log(actualItems);

  // try {
  //   console.log("TRYING TO SORT");
  //   actualItems = actualItems.sort("-date").exec(function (err, docs) {
  //     if (err) {
  //       return err;
  //     }
  //     return docs;
  //   });
  // } catch (err) {
  //   console.log("CAUGHT AN ERROR");
  //   console.log(err);
  //   err.stack;
  // }

  // console.log(typeof actualItems);
  // console.log(actualItems);

  res.json(record);
});

// CREATE BUDGET POST/GETS

module.exports = router;
