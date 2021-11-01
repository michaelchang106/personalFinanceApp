// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/

let incomePost = document.getElementById("anonIncomePost"); //anon first by default
let taxAmountDiv = document.getElementById("taxAmountDiv");

import showDeleteAndUpdateButton from "./showDeleteAndUpdateButton.mjs";
import renderTaxInformationHTML from "./renderTaxInformationHTML.mjs";

// listen for click on incomePost button
incomePost.addEventListener("submit", async (event) => {
  event.preventDefault();

  // grab form data after click
  const formData = new FormData(incomePost);

  // convert FormData to JSON
  const plainFormData = Object.fromEntries(formData.entries());
  let formDataJSONString = JSON.stringify(plainFormData);

  // hacky way to add userID from localStorage to update in Database
  let oneLessThanLength = formDataJSONString.length - 1;
  formDataJSONString = formDataJSONString.slice(0, oneLessThanLength);
  // hacky way to add the userID
  formDataJSONString += `,"userID":"${localStorage.getItem("userID")}"}`;

  // needs to be in this scope for use later in DOM rendering
  let taxAmount;

  //switch fetchAction between anon and user for routing
  let fetchAction;
  if (incomePost.id === "anonIncomePost") {
    fetchAction = "/anonIncomePost";
  } else if (incomePost.id === "userIncomePost") {
    fetchAction = "/userIncomePost";
  }
  try {
    // FETCH POST anon or user -- IncomePost
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
  if (fetchAction === "/userIncomePost") {
    showDeleteAndUpdateButton();
  }
  // clear the current HTML
  taxAmountDiv.innerHTML = "";
  
  // render the HTML with DOM manipulation
  renderTaxInformationHTML(taxAmount);
  
});
