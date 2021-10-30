// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/

let incomeSubmission = document.getElementById("anonIncomeSubmission"); //anon first by default
let taxAmountDiv = document.getElementById("taxAmountDiv");

import showDeleteButton from "./modules/showDeleteButton.mjs";

// listen for click on incomeSubmission button
incomeSubmission.addEventListener("submit", async (event) => {
  event.preventDefault();

  // grab form data after click
  const formData = new FormData(incomeSubmission);

  // convert FormData to JSON
  const plainFormData = Object.fromEntries(formData.entries());
  let formDataJSONString = JSON.stringify(plainFormData);

  // hacky way to add userID from localStorage to update in Database
  let oneLessThanLength = formDataJSONString.length - 1;
  formDataJSONString = formDataJSONString.slice(0, oneLessThanLength);
  // add the userID
  formDataJSONString += `,"userID":"${localStorage.getItem("userID")}"}`;

  // needs to be in this scope for use later in DOM rendering
  let taxAmount;

  //switch fetchAction between anon and user for routing
  let fetchAction;
  if (incomeSubmission.id === "anonIncomeSubmission") {
    fetchAction = "/anonIncomeSubmission";
  } else if (incomeSubmission.id === "userIncomeSubmission") {
    fetchAction = "/userIncomeSubmission";
  }
  try {
    // FETCH POST anon or user -- IncomeSubmission
    const res = await fetch(fetchAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJSONString,
    });
    if (!res.ok) {
      throw new Error("Response not ok " + res.status);
    }

    // assign taxAmount the response json
    taxAmount = await res.json();

    //catch error
  } catch (error) {
    taxAmountDiv.innerHTML = error.message;
  }

  // if user then show delete button
  if (fetchAction === "/userIncomeSubmission") {
    showDeleteButton();
  }
  // clear the current HTML and do DOM manipulation
  taxAmountDiv.innerHTML = "";
  for (let [key, value] of Object.entries(taxAmount)) {
    let divTax = document.createElement("div");
    divTax.className = "col-3 tax";
    divTax.innerText = `${key} - ${value}`;

    taxAmountDiv.appendChild(divTax);
  }
});
