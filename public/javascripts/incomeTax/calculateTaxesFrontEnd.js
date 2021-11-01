// for tax calculations
import federalTax from "./federalTax.mjs";
import ficaTax from "./ficaTax.mjs";
import stateTax from "./stateTax.mjs";
let dollarUSLocale = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function calculateTaxesFrontEnd(salary, marital, state) {
  // calculate the taxes from front end modules
  let federalTaxAmount = federalTax(salary, marital);
  let stateTaxAmount = ficaTax(salary, marital, state);
  let ficaTaxAmount = stateTax(salary, marital);
  let totalTaxAmount = federalTaxAmount + stateTaxAmount + ficaTaxAmount;

  return {
    Federal: dollarUSLocale.format(federalTaxAmount),
    FICA: dollarUSLocale.format(ficaTaxAmount),
    State: dollarUSLocale.format(stateTaxAmount),
    Total: dollarUSLocale.format(totalTaxAmount),
  };
}
