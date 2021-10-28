let express = require("express");
let router = express.Router();

let federalTax = require("../public/javascripts/federalTax.js");
let ficaTax = require("../public/javascripts/ficaTax.js");
let stateTax = require("../public/javascripts/stateTax.js");
let dollarUSLocale = Intl.NumberFormat("en-US");

let database = require("../database/database.js");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.post("/anonIncomeSubmission", function (req, res) {
  const anonInfo = req.body;

  const salary = anonInfo.salary;
  const state = anonInfo.state;
  const marital = anonInfo.marital;

  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  // console.log(
  //   `Got information salary: ${salary}, state: ${state}, filing status: ${marital}`
  // );

  // console.log(dollarUSLocale.format(federalTaxAmount), "in federal taxes");
  // console.log(
  //   dollarUSLocale.format(ficaTaxAmount),
  //   "in social security and medicare taxes"
  // );
  // console.log(dollarUSLocale.format(stateTaxAmount), `in ${state} state taxes`);
  // console.log(
  //   dollarUSLocale.format(totalTaxAmount),
  //   "-- Total estimate of taxes"
  // );

  res.json({
    Federal: dollarUSLocale.format(federalTaxAmount.toFixed(2)),
    FICA: dollarUSLocale.format(ficaTaxAmount.toFixed(2)),
    State: dollarUSLocale.format(stateTaxAmount.toFixed(2)),
    Total: dollarUSLocale.format(totalTaxAmount.toFixed(2)),
  });
});

module.exports = router;
