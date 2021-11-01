// for tax calculations
let federalTax = require("./federalTax.js");
let ficaTax = require("./ficaTax.js");
let stateTax = require("./stateTax.js");
let dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function calculateTaxesBackEnd(salary, marital, state) {
  const federalTaxAmount = federalTax(salary, marital);
  const ficaTaxAmount = ficaTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const totalTaxAmount = federalTaxAmount + ficaTaxAmount + stateTaxAmount;

  return {
    Federal: dollarUSLocale.format(federalTaxAmount),
    FICA: dollarUSLocale.format(ficaTaxAmount),
    State: dollarUSLocale.format(stateTaxAmount),
    Total: dollarUSLocale.format(totalTaxAmount),
  };
}

module.exports = calculateTaxesBackEnd;
