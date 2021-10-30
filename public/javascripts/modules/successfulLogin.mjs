// for tax calculations
import federalTax from "./federalTax.mjs";
import ficaTax from "./ficaTax.mjs";
import stateTax from "./stateTax.mjs";
let dollarUSLocale = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// for deleting user income data
import showDeleteButton from "./showDeleteButton.mjs";

export default function sucessfulLogin(loginData) {
  let loginContainerDiv = document.getElementById("loginContainerDiv"); //DIV HTML
  let taxAmountDiv = document.getElementById("taxAmountDiv");

  // if there is a userID upon successful login
  if (loginData.userID) {
    loginContainerDiv.innerHTML = "";
    loginContainerDiv.innerHTML = `Welcome Back ${loginData.firstName} ${loginData.lastName}!`;

    // change the HTML DIV ID from anonIncomeSubmission to userIncomeSubmission
    document
      .getElementById("anonIncomeSubmission")
      .setAttribute("id", "userIncomeSubmission");

    // clear the current HTML and do DOM manipulation if there is taxData from Database
    taxAmountDiv.innerHTML = "";
    if (loginData.taxData) {
      let salary = loginData.taxData.salary;
      let state = loginData.taxData.state;
      let marital = loginData.taxData.marital;

      // change the drop down to the values from the database
      document.getElementById("incomeButton").innerHTML = "Update";
      document.getElementById("salary").value = salary;
      document.getElementById("state").value = state;
      document.getElementById("marital").value = marital;

      showDeleteButton();

      // calculate the taxes from front end modules
      let federalTaxAmount = federalTax(salary, marital);
      let stateTaxAmount = ficaTax(salary, marital, state);
      let ficaTaxAmount = stateTax(salary, marital);
      let totalTaxAmount = federalTaxAmount + stateTaxAmount + ficaTaxAmount;

      // create object to use in DOM manipulation
      let taxAmounts = {
        Federal: dollarUSLocale.format(federalTaxAmount),
        FICA: dollarUSLocale.format(ficaTaxAmount),
        State: dollarUSLocale.format(stateTaxAmount),
        Total: dollarUSLocale.format(totalTaxAmount),
      };
      // render the DOM manipulation to show the taxes
      for (let [key, value] of Object.entries(taxAmounts)) {
        let divTax = document.createElement("div");
        divTax.className = "col-3 tax";
        divTax.innerText = `${key} - ${value}`;

        taxAmountDiv.appendChild(divTax);
      }
    }
  } else {
    alert(loginData.error);
  }
}
