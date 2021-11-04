// for deleting user income data
import deleteUserIncome from "./deleteUserIncome.js";

let incomeButton = document.getElementById("incomeButton");
let deleteIncomeSpan = document.getElementById("deleteIncomeSpan");

export default function showDeleteAndUpdateButton() {
  //change submit to update
  incomeButton.innerHTML = "Update";

  //show the delete button
  deleteIncomeSpan.innerHTML =
    "<button type='button' id='deleteIncomeButton'>Delete</button>";

  // needs to be in this scope because of creation order
  // create delete button and listen for delete click
  document
    .getElementById("deleteIncomeButton")
    .addEventListener("click", deleteUserIncome);
}
