let express = require("express");
let router = express.Router();

// for login encryption
const bcrypt = require("bcrypt");

// for database connection
const mongoose = require("mongoose");
const userLoginInfo = require("../database/userSchema.js");
const actualBudgetSchema = require("../database/actualBudgetIncomeSchema.js");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

/* FETCH POST anonIncomePost*/
router.post("/incomePost", function (req, res) {
  console.log("ANONOMYOUS POST INCOME -- POST");
  res.status(200).send();
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

  //connect to database
  await mongoose.connect("mongodb://localhost/UserLoginDB");

  //query and update into database
  await userLoginInfo.findOneAndUpdate(query, update);

  // close database
  await mongoose.connection.close();
  res.json(salary, marital, state);
});

/* FETCH POST loginPost*/
router.post("/loginPost", async function (req, res) {
  const loginInfo = req.body;

  //check if username exists
  try {
    // connect to database
    await mongoose.connect("mongodb://localhost/UserLoginDB");

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
  } finally {
    // close database
    await mongoose.connection.close();
  }
});

/* FETCH POST deleteUserIncome*/
router.post("/deleteUserIncome", async function (req, res) {
  console.log("USER DELETE INCOME -- POST");
  const loginInfo = req.body;

  // connect to database
  await mongoose.connect("mongodb://localhost/UserLoginDB");

  // query and update definitions
  let query = { userID: loginInfo.userID };
  let update = { $unset: { taxData: "" } };
  await userLoginInfo.findOneAndUpdate(query, update);

  // close database
  await mongoose.connection.close();
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
    await mongoose.connect("mongodb://localhost/UserLoginDB");
    await actualBudgetSchema.findOneAndUpdate(query, update, options);
  } catch {
    res.status();
  } finally {
    await mongoose.connection.close();
  }

  await mongoose.connect("mongodb://localhost/UserLoginDB");
  let record = await actualBudgetSchema.findOne(query);
  await mongoose.connection.close();
  res.json(record);
});

router.post("/actualItemsGet", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- GET");
  const actualItem = req.body;

  // query, update, option definitions
  const query = { userID: actualItem.userID };
  let record;

  try {
    await mongoose.connect("mongodb://localhost/UserLoginDB");

    record = await actualBudgetSchema.findOne(query);
  } catch {
    res.status();
  } finally {
    await mongoose.connection.close();
  }

  res.json(record);
});
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

// CREATE BUDGET POST/GETS

module.exports = router;
