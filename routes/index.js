let express = require("express");
let router = express.Router();

// for tax calculations
let federalTax = require("../public/javascripts/federalTax.js");
let ficaTax = require("../public/javascripts/ficaTax.js");
let stateTax = require("../public/javascripts/stateTax.js");
let dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// for login encryption
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
  console.log("ANONOMYOUS POST INCOME SUBMISSION");
  const anonInfo = req.body;

  const salary = anonInfo.salary;
  const state = anonInfo.state;
  const marital = anonInfo.marital;

  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  res.json({
    Federal: dollarUSLocale.format(federalTaxAmount),
    FICA: dollarUSLocale.format(ficaTaxAmount),
    State: dollarUSLocale.format(stateTaxAmount),
    Total: dollarUSLocale.format(totalTaxAmount),
  });
});

/* FETCH POST userIncomeSubmission*/
router.post("/userIncomeSubmission", async function (req, res) {
  console.log("USER POST INCOME SUBMISSION");
  const loginInfo = req.body;

  // filter and update definitions
  let filter = { userID: loginInfo.userID };
  let update = {
    taxData: {
      salary: loginInfo.salary,
      state: loginInfo.state,
      marital: loginInfo.marital,
    },
  };
  //filter and update into database
  await userLoginInfo.findOneAndUpdate(filter, update);

  const salary = loginInfo.salary;
  const state = loginInfo.state;
  const marital = loginInfo.marital;

  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  res.json({
    Federal: dollarUSLocale.format(federalTaxAmount),
    FICA: dollarUSLocale.format(ficaTaxAmount),
    State: dollarUSLocale.format(stateTaxAmount),
    Total: dollarUSLocale.format(totalTaxAmount),
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
      res.json(record);
    } else {
      res.json({ error: "Password does not match our records" });
    }
  } catch (error) {
    res.json({ error: "User not found" });
  }
});

/* FETCH POST deleteUserIncome*/
router.post("/deleteUserIncome", async function (req, res) {
  console.log("USER DELETE INCOME SUBMISSION");
  const loginInfo = req.body;

  // filter and update definitions
  let filter = { userID: loginInfo.userID };
  let update = { $unset: { taxData: "" } };
  await userLoginInfo.findOneAndUpdate(filter, update);

  res.send();
});

//CREATE ROUTE FOR GET DATA (ACTUAL, BUDGET, INCOME)
// * connect to server and grab data if it exists & return it to the request

//CREATE ROUTE FOR USER INCOME SUBMISSION

module.exports = router;
