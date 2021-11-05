let taxAmountDiv = document.getElementById("taxAmountDiv");
let incomeButton = document.getElementById("incomeButton");
let deleteIncomeSpan = document.getElementById("deleteIncomeSpan");

export default async function deleteUserIncome() {
  try {
    const res = await fetch("/deleteUserIncome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: `{"userID":"${localStorage.getItem("userID")}"}`,
    });
    if (!res.ok) {
      throw new Error("Response not ok " + res.status);
    }
    // deleted message to HTML
    taxAmountDiv.innerHTML = "";
    alert("Income data deleted");

    // change button back to Submit
    incomeButton.innerHTML = "Submit";

    // remove the delete button
    deleteIncomeSpan.innerHTML = "";
  } catch (error) {
    throw new Error("Error sending POST to delete user income", error);
  }
}
