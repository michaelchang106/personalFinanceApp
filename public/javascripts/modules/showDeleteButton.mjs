// for deleting user income data
import deleteUserIncome from "./deleteUserIncome.mjs";

export default function showDeleteButton() {
  //show the delete button
  document.getElementById("deleteIncomeSpan").innerHTML =
    "<button type='button' id='deleteIncomeButton'>Delete</button>";

  // listen for delete click
  document
    .getElementById("deleteIncomeButton")
    .addEventListener("click", deleteUserIncome);
}
