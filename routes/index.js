let express = require("express");
let router = express.Router();

// for tax calculations
let federalTax = require("../public/javascripts/federalTax.js");
let ficaTax = require("../public/javascripts/ficaTax.js");
let stateTax = require("../public/javascripts/stateTax.js");
let dollarUSLocale = Intl.NumberFormat("en-US");

// for login authentication
const bcrypt = require("bcrypt");

// for database connection
const mongoose = require("mongoose");
const userLoginInfo = require("../database/userSchema.js");
mongoose.connect("mongodb://localhost/UserLoginDB");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

/* FETCH POST anonIncomeSubmission*/
router.post("/anonIncomeSubmission", function (req, res) {
  console.log("ANON POST SUBMISSION");
  const anonInfo = req.body;

  const salary = anonInfo.salary;
  const state = anonInfo.state;
  const marital = anonInfo.marital;

  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  res.json({
    Federal: dollarUSLocale.format(federalTaxAmount.toFixed(2)),
    FICA: dollarUSLocale.format(ficaTaxAmount.toFixed(2)),
    State: dollarUSLocale.format(stateTaxAmount.toFixed(2)),
    Total: dollarUSLocale.format(totalTaxAmount.toFixed(2)),
  });
});

/* FETCH POST userIncomeSubmission*/
router.post("/userIncomeSubmission", function (req, res) {
  // need too add DB CRUD for user income data
  // db.collection.update(
  //   { _id: "1", "projectList.projectID": "Spring" },
  //   { $set: { "projectList.$.resourceIDList": ["Something", "new"] } }
  // );

  console.log("USER POST SUBMISSION -- NEED TO UPDATE DATABSE");

  const userInfo = req.body;

  const salary = userInfo.salary;
  const state = userInfo.state;
  const marital = userInfo.marital;

  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  res.json({
    Federal: dollarUSLocale.format(federalTaxAmount.toFixed(2)),
    FICA: dollarUSLocale.format(ficaTaxAmount.toFixed(2)),
    State: dollarUSLocale.format(stateTaxAmount.toFixed(2)),
    Total: dollarUSLocale.format(totalTaxAmount.toFixed(2)),
  });
});

/* FETCH POST loginSubmission*/
router.post("/loginSubmission", async function (req, res) {
  const loginInfo = req.body;

  //check if username exists
  try {
    // grabbing the data using username from MongoDB
    let record = await userLoginInfo.findOne({ userID: loginInfo.username });

    if (record.password === loginInfo.password) {
      if (record.taxData) {
        //Do something to calculate the taxes with the user submitted info
      }
      // HOW DO I ADD ADDITIONAL JSON PROPERTIES TO THIS PROMISE COMING FROM FINDONE() MONGOOSE
      res.json(record);
    } else {
      res.json({ error: "Password does not match our records" });
    }
  } catch (error) {
    res.json({ error: "User not found" });
  }
});

//CREATE ROUTE FOR GET DATA (ACTUAL, BUDGET, INCOME)
// * connect to server and grab data if it exists & return it to the request

//CREATE ROUTE FOR USER INCOME SUBMISSION

module.exports = router;
