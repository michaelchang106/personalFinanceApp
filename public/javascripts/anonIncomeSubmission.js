// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/

let incomeSubmission = document.getElementById("anonIncomeSubmission"); //anon first by default
let taxAmountDiv = document.getElementById("taxAmountDiv");

incomeSubmission.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(incomeSubmission);

  // convert FormData to JSON
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJSONString = JSON.stringify(plainFormData);

  let taxAmount;

  try {
    let fetchAction;
    if (incomeSubmission.id === "anonIncomeSubmission") {
      fetchAction = "/anonIncomeSubmission";
    } else if (incomeSubmission.id === "userIncomeSubmission") {
      fetchAction = "/userIncomeSubmission";
    }
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
    taxAmount = await res.json();
  } catch (error) {
    taxAmountDiv.innerHTML = error.message;
  }

  // clear the current HTML and do DOM manipulation
  taxAmountDiv.innerHTML = "";
  for (let [key, value] of Object.entries(taxAmount)) {
    let divTax = document.createElement("div");
    divTax.className = "col-4 tax";

    let divAmount = document.createElement("div");
    divAmount.className = "amount";
    divAmount.innerText = `${key} - ${value}`;

    divTax.appendChild(divAmount);
    taxAmountDiv.appendChild(divTax);
  }
});
