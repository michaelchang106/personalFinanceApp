import calculateTaxesFrontEnd from "../incomeTax/calculateTaxesFrontEnd.js"; // imports for tax calculations
// imports for deleting user income data
import showDeleteAndUpdateButton from "../incomeTax/modules/showDeleteAndUpdateButton.js";
import renderTaxInformationHTML from "../incomeTax/modules/renderTaxInformationHTML.js";
// imports for create actual and budget sections
import createBudgetSection from "../budget/createBudgetSection.js";
import createActualSection from "../actuals/createActualSection.js";

// for DOM rendering
const loginContainerDiv = document.getElementById("loginContainerDiv"); //DIV HTML
const taxAmountDiv = document.getElementById("taxAmountDiv");
const logoutAnchor = document.createElement("a");
const signoutDiv = document.createElement("div");
logoutAnchor.href = "/";
logoutAnchor.id = "signout";
logoutAnchor.innerHTML = "Signout";

export default function sucessfulLogin(loginData) {
  // if there is a userID upon successful login
  if (loginData.userID) {
    loginContainerDiv.innerHTML = "";
    loginContainerDiv.innerHTML = `<span style='font-size:36px'>Welcome Back ${loginData.firstName} ${loginData.lastName}!</span>`;
    loginContainerDiv.appendChild(signoutDiv);
    signoutDiv.appendChild(logoutAnchor);

    // change the HTML DIV ID from incomePost to userIncomePost
    document.getElementById("incomePost").setAttribute("id", "userIncomePost");

    //Clear local storage when user signsout
    const singoutElement = document.querySelector("#signout");
    singoutElement.addEventListener("click", () => {
      localStorage.clear();
    });

    // clear the current HTML and do DOM manipulation if there is incomeData from Database
    taxAmountDiv.innerHTML = "";
    if (loginData.incomeData) {
      const salary = loginData.incomeData.salary;
      const state = loginData.incomeData.state;
      const marital = loginData.incomeData.marital;

      // change the drop down to the values from the database
      document.getElementById("salary").value = salary;
      document.getElementById("state").value = state;
      document.getElementById("marital").value = marital;

      // show delete button and change submit to update button
      showDeleteAndUpdateButton();

      // create object to use in DOM manipulation
      const taxAmounts = calculateTaxesFrontEnd(salary, marital, state);
      // render the DOM manipulation to show the taxes
      renderTaxInformationHTML(taxAmounts);

      // create the add, delete, edit buttons
    }
    createBudgetSection();
    createActualSection();
  } else {
    alert(loginData.error);
  }
}
