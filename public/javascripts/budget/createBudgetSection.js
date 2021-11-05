import createBudgetForm from "./modules/createBudgetForm.js";
let budgetDiv = document.getElementById("budgetDiv");

export default async function createBudgetSection() {
  // create the budget div
  let budgetFormDiv = document.createElement("div");
  budgetFormDiv.id = "budgetFormDiv";

  //Create a budgetForm and childAppend to budgetFormDiv
  createBudgetForm(budgetFormDiv);

  budgetDiv.innerHTML = "";
  budgetDiv.appendChild(budgetFormDiv);

  let budgetItemCards = document.createElement("div");
  budgetItemCards.className = "row";
  budgetFormDiv.appendChild(budgetItemCards);

  //Load previously stored data.

  const storedBudgetData = await loadBudgetData();
  let index = 0;
  if (storedBudgetData) {
    for (let item of storedBudgetData) {
      //Create for to delete budget
      index = createBudgetCard(item, budgetItemCards, index);
    }
  }

  // Submit data to database
  let budgetForm = document.getElementById("budgetItemsForm");
  index = await submitBudgetToDB(budgetForm, budgetItemCards, index);
}

//--------------------Load User Data------------------------------
async function loadBudgetData() {
  console.log("Fetch POST LOAD");
  try {
    // FETCH POST actualItemsPost
    const res = await fetch("/budgetItem/loadBudget", {
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

    // assign actualItem the response json
    return await res.json();

    //catch error
  } catch (error) {
    return error.message;
  }
}

//--------------------Submit New Data and Display------------------

// Helper add budget to submite for to mongoDB.
async function submitBudgetToDB(budgetForm, parentDiv, index) {
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

    const budgetJSON = await res.json();

    return createBudgetCard(
      budgetJSON[budgetJSON.length - 1],
      parentDiv,
      index
    );
  });
}

// Add a budget
function createBudgetCard(budgetForm, parentDiv, index) {
  //Create a form
  const formElement = document.createElement("form");
  formElement.id = `formDelete${index}`;
  index += 1;
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "submit";
  deleteBtn.innerHTML = "Delete";
  //Format for size
  const cardDiv = document.createElement("div");
  cardDiv.className = "card col-4 mt-3";
  parentDiv.appendChild(cardDiv);
  cardDiv.appendChild(formElement);

  for (let [key, value] of Object.entries(budgetForm)) {
    const valueDiv = createCardDiv(key, value);
    formElement.appendChild(valueDiv);
    formElement.appendChild(deleteBtn);
  }

  return index;
}

// // This will add each item of a budget to the card
function createCardDiv(key, value) {
  const dollarUSLocale = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  key = toTitleCase(key);

  if (key === "Date") {
    let tempDate = new Date(value);
    value = tempDate.toLocaleDateString("en-US");
  } else if (key === "Amount") {
    value = dollarUSLocale.format(value);
  }

  const budgetDiv = document.createElement("div");
  budgetDiv.innerHTML = `${key} - ${value}`;
  return budgetDiv;
}
