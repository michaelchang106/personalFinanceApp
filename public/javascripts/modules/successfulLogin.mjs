export default function sucessfulLogin(loginData) {
  let loginContainerDiv = document.getElementById("loginContainerDiv"); //DIV HTML
  if (loginData.userID) {
    loginContainerDiv.innerHTML = "";
    loginContainerDiv.innerHTML = `Welcome back ${loginData.firstName} ${loginData.lastName}`;
    // change the HTML DIV ID from anonIncomeSubmission to userIncomeSubmission
    document
      .getElementById("anonIncomeSubmission")
      .setAttribute("id", "userIncomeSubmission");

    let taxAmountDiv = document.getElementById("taxAmountDiv");

    // clear the current HTML and do DOM manipulation if there is taxData from Database
    taxAmountDiv.innerHTML = "";
    if (loginData.taxData) {
      document.getElementById("incomeButton").innerHTML = "Update";
      document.getElementById("salary").value = loginData.taxData.salary;
      document.getElementById("state").value = loginData.taxData.state;
      document.getElementById("marital").value = loginData.taxData.marital;

      for (let [key, value] of Object.entries(loginData.taxData)) {
        let divTax = document.createElement("div");
        divTax.className = "col-4 tax";

        let divAmount = document.createElement("div");
        divAmount.className = "amount";
        divAmount.innerText = `${key} - ${value}`;

        divTax.appendChild(divAmount);
        taxAmountDiv.appendChild(divTax);
      }
    }
  } else {
    alert(loginData.error);
  }
}
