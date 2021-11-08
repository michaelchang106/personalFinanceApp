import createBudgetForm from "./modules/createBudgetForm.js";
const budgetDiv = document.getElementById("budgetDiv");

const outerBudgetDiv = document.createElement("div");
// outerBudgetDiv.innerHTML = "d-flex justify-content-center";

export default async function createBudgetSection() {
  // create the budget div
  const budgetFormDiv = document.createElement("div");
  budgetFormDiv.id = "budgetFormDiv";

  //Create a budgetForm and childAppend to budgetFormDiv
  createBudgetForm(budgetFormDiv);

  budgetDiv.innerHTML = "";
  budgetDiv.appendChild(budgetFormDiv);

  const budgetItemCards = document.createElement("div");
  budgetItemCards.className = "row budgetContainer";
  budgetFormDiv.appendChild(budgetItemCards);

  //Load previously stored data.

  const storedBudgetData = await loadBudgetData();
  let index = 0;
  if (storedBudgetData) {
    for (const item of storedBudgetData.budgetItems) {
      //Create for to delete budget
      index = createBudgetCard(item, budgetItemCards, index);
    }
  }

  // Submit data to database
  const budgetForm = document.getElementById("budgetItemsForm");
  await submitBudgetToDB(budgetForm, budgetItemCards);
}

//--------------------Load User Data------------------------------

async function loadBudgetData() {
  try {
    // FETCH POST budgetItem Post
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
async function submitBudgetToDB(budgetForm, parentDiv) {
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

    let index = budgetJSON.length - 1;
    return createBudgetCard(budgetJSON[index], parentDiv, index);
  });
}

//----------------Delete a budget Item an reload cards----------------------

async function deleteCard(event, index) {
  event.preventDefault();

  try {
    // FETCH POST actualItemsPost
    const res = await fetch("/budgetItem/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: `{"userID":"${localStorage.userID}", "index": "${index}"}`,
    });
    if (!res.ok) {
      throw new Error("Response not ok " + res.status);
    }

    // //Get updated budget data
    let storedBudgetData = await res.json();
    storedBudgetData = storedBudgetData.budgetItems;

    //Erase currently viewd budget cards
    const budgetContainer = document.querySelector(".budgetContainer");
    budgetContainer.innerHTML = "";

    //----------Rerender the page ---------------
    index = 0;
    for (let item of storedBudgetData) {
      index = createBudgetCard(item, budgetContainer, index);
    }

    //Display new budget
  } catch (error) {
    return error.message;
  }
}

// Add a budget
function createBudgetCard(budgetForm, parentDiv, index) {
  const btnContain = document.createElement("div");
  btnContain.className = "d-flex justify-content-center";
  // const innerBtnContain = btnContain;
  // innerBtnContain.className = "col-6";

  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  deleteBtn.type = "submit";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "btn btn-danger m-1";
  editBtn.innerHTML = "Edit";
  editBtn.className = "editBtn";

  //Format for size -- made a form to handle indexes
  const cardDiv = document.createElement("form");
  cardDiv.className = "card col-4 m-1 deleteForm";

  cardDiv.id = `formDelete-${index}`;

  // editBtn.id = `editBtn-${index}`;
  const indexInput = document.createElement("input");
  indexInput.value = index;
  indexInput.name = "index";
  indexInput.type = "hidden";

  cardDiv.appendChild(indexInput);
  parentDiv.appendChild(cardDiv);
  // cardDiv.appendChild(formElement);

  for (const [key, value] of Object.entries(budgetForm)) {
    const valueDiv = createCardDiv(key, value);
    cardDiv.appendChild(valueDiv);
    cardDiv.appendChild(btnContain);

    btnContain.appendChild(deleteBtn);
    // btnContain.appendChild(editBtn);
  }
  const deleteForm = document.getElementById(`formDelete-${index}`);

  deleteForm.addEventListener("submit", async (event) => {
    await deleteCard(event, indexInput.value);
    index = 0;
  });

  index += 1;

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
    const tempDate = new Date(value);
    value = tempDate.toLocaleDateString("en-US");
  } else if (key === "Amount") {
    value = dollarUSLocale.format(value);
  }

  const budgetDiv = document.createElement("div");
  budgetDiv.innerHTML = `<strong>${key} </strong>- ${value}`;
  return budgetDiv;
}
