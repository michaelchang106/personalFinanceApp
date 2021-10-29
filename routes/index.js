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

/* FETCH POST incomeSubmission*/
router.post("/anonIncomeSubmission", function (req, res) {
  const anonInfo = req.body;

  const salary = anonInfo.salary;
  const state = anonInfo.state;
  const marital = anonInfo.marital;

  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  console.log("Got information and calculated taxes!");

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
    const record = await userLoginInfo.findOne({ userID: loginInfo.username });
    if (record.password === loginInfo.password) {
      res.json(record);
    } else {
      res.json({ error: "Password does not match our records" });
    }
  } catch (error) {
    res.json({ error: "User not found" });
  }
});

// for (let [key, value] of Object.entries(loginInfo)) {
//   console.log(key, value);
// }

module.exports = router;
