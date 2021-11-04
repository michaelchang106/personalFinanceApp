// for tax calculations
import federalTax from "./modules/federalTax.js";
import ficaTax from "./modules/ficaTax.js";
import stateTax from "./modules/stateTax.js";
const dollarUSLocale = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function calculateTaxesFrontEnd(salary, marital, state) {
  // calculate the taxes from front end modules
  const federalTaxAmount = federalTax(salary, marital);
  const stateTaxAmount = stateTax(salary, marital, state);
  const ficaTaxAmount = ficaTax(salary, marital);
  const totalTaxAmount = federalTaxAmount + stateTaxAmount + ficaTaxAmount;

  return {
    Federal: dollarUSLocale.format(federalTaxAmount),
    FICA: dollarUSLocale.format(ficaTaxAmount),
    State: dollarUSLocale.format(stateTaxAmount),
    Total: dollarUSLocale.format(totalTaxAmount),
  };
}
