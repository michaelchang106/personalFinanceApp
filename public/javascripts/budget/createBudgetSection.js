import createBudgetForm from "./modules/createBudgetForm.js";
let budgetDiv = document.getElementById("budgetDiv");

export default function createBudgetSection() {
  // create the budget div

  //Crete a budget Form
  let budgetFormDiv = document.createElement("div");
  budgetFormDiv.id = "budgetFormDiv";

  createBudgetForm(budgetFormDiv);

  // let budgetButtonsDiv = document.createElement("div");
  // budgetButtonsDiv.className = "budgetButtonsDiv";

  // // clear the div and add the buttons
  budgetDiv.innerHTML = "";
  budgetDiv.appendChild(budgetFormDiv);

  // addBudgetButton.addEventListener("click", addBudgetItemCard());

  // create the div for the budget cards/items
  let rowBudgetCardsDiv = document.createElement("div");

  rowBudgetCardsDiv.className = "row";
  rowBudgetCardsDiv.id = "budgetCardsDiv";

  // create div for the budget item cards
  budgetDiv.appendChild(rowBudgetCardsDiv);

  let budgetForm = document.getElementById("budgetItemsForm");

  // Create new form data from user input.

  budgetForm.addEventListener("submit", async (event) => {
    event.preventDefault(); //stops event from routing to a new pages

    //Create new form data from user entry
    const formData = new FormData(budgetForm);
    const plaidnFormData = Object.fromEntries(formData.entries()); //Iterates and converts each entry to a JSON
    plaidnFormData.userID = localStorage.userID;
    const formDataJSON = JSON.stringify(plaidnFormData);

    // Post budget Item to our database
    const res = await fetch("/budgetItem/post", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJSON, // body data type must match "Content-Type" header
    });

    console.log(res);
  });
}
