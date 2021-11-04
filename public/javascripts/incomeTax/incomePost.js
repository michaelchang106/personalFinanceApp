// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/

let incomePost = document.getElementById("incomePost"); //incomePost first by default
let taxAmountDiv = document.getElementById("taxAmountDiv");

import showDeleteAndUpdateButton from "./modules/showDeleteAndUpdateButton.js";
import renderTaxInformationHTML from "./modules/renderTaxInformationHTML.js";
import calculateTaxesFrontEnd from "./calculateTaxesFrontEnd.js";

// listen for submit on incomePost button
incomePost.addEventListener("submit", async (event) => {
  event.preventDefault();

  // grab formData after submit
  const formData = new FormData(incomePost);

  // convert FormData to plainFormData and parseInt for salary
  const plainFormData = Object.fromEntries(formData.entries());
  plainFormData.salary = parseInt(plainFormData.salary);

  // convert to JSON for use later when passing to backend
  let formDataJSONString = JSON.stringify(plainFormData);

  // calculate taxes
  let taxAmount = calculateTaxesFrontEnd(
    plainFormData.salary,
    plainFormData.marital,
    plainFormData.state
  );

  //switch fetchAction between anon and user for routing
  let fetchAction;
  if (incomePost.id === "incomePost") {
    fetchAction = "/incomePost";
  } else if (incomePost.id === "userIncomePost") {
    fetchAction = "/userIncomePost";

    // hacky way to add userID from localStorage to update in Database
    let oneLessThanLength = formDataJSONString.length - 1;
    formDataJSONString = formDataJSONString.slice(0, oneLessThanLength);

    // hacky way to add the userID
    formDataJSONString += `,"userID":"${localStorage.getItem("userID")}"}`;

    try {
      // FETCH POST anon or user --- incomePost
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
      //catch error
    } catch (error) {
      taxAmountDiv.innerHTML = error.message;
    }

    // if user is logged in then show delete button
    showDeleteAndUpdateButton();
  }
  // clear the current HTML
  taxAmountDiv.innerHTML = "";

  // render the tax info with DOM
  renderTaxInformationHTML(taxAmount);
});
