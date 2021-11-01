// for tax calculations
import calculateTaxesFrontEnd from "../incomeTax/calculateTaxesFrontEnd.js";

// for deleting user income data
import showDeleteAndUpdateButton from "../incomeTax/showDeleteAndUpdateButton.mjs";
import renderTaxInformationHTML from "../incomeTax/renderTaxInformationHTML.mjs";

// create actual and budget sections
import createBudgetSection from "../budget/createBudgetSection.mjs";
import createActualSection from "../actuals/createActualSection.mjs";

// for DOM rendering
let loginContainerDiv = document.getElementById("loginContainerDiv"); //DIV HTML
let taxAmountDiv = document.getElementById("taxAmountDiv");

export default function sucessfulLogin(loginData) {
  // if there is a userID upon successful login
  if (loginData.userID) {
    loginContainerDiv.innerHTML = "";
    loginContainerDiv.innerHTML = `Welcome Back ${loginData.firstName} ${loginData.lastName}!`;

    // change the HTML DIV ID from anonIncomePost to userIncomePost
    document
      .getElementById("anonIncomePost")
      .setAttribute("id", "userIncomePost");

    // clear the current HTML and do DOM manipulation if there is taxData from Database
    taxAmountDiv.innerHTML = "";
    if (loginData.taxData) {
      let salary = loginData.taxData.salary;
      let state = loginData.taxData.state;
      let marital = loginData.taxData.marital;

      // change the drop down to the values from the database
      document.getElementById("salary").value = salary;
      document.getElementById("state").value = state;
      document.getElementById("marital").value = marital;

      // show delete button and change submit to update button
      showDeleteAndUpdateButton();

      // create object to use in DOM manipulation
      let taxAmounts = calculateTaxesFrontEnd(salary, marital, state);
      // render the DOM manipulation to show the taxes
      renderTaxInformationHTML(taxAmounts);

      // create the add, delete, edit buttons
    }
  } else {
    alert(loginData.error);
  }

  createBudgetSection();
  createActualSection();
}