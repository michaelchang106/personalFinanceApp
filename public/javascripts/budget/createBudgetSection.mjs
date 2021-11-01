let budgetDiv = document.getElementById("budgetDiv");

export default function createBudgetSection() {
  // create the budget div
  let budgetButtonsDiv = document.createElement("div");
  budgetButtonsDiv.className = "budgetButtonsDiv";

  // create add, delete, edit budget butons
  let addBudgetButton = document.createElement("button");
  addBudgetButton.id = "addBudgetButton";
  addBudgetButton.innerHTML = "Add Budget Item";

  // clear the div and add the buttons
  budgetDiv.innerHTML = "";
  budgetDiv.appendChild(addBudgetButton);

  // addBudgetButton.addEventListener("click", addBudgetItemCard());

  // create the div for the budget cards/items
  let rowBudgetCardsDiv = document.createElement("div");
  rowBudgetCardsDiv.className = "row";
  rowBudgetCardsDiv.id = "budgetCardsDiv";

  // create div for the budget item cards
  budgetDiv.appendChild(rowBudgetCardsDiv);
}
