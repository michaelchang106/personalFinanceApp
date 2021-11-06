import createActualItemsForm from "./modules/createActualItemsForm.js";
import actualItemsPost from "./modules/actualItemsPost.js";
import actualItemsGet from "./modules/actualItemsGet.js";
import createActualCards from "./modules/createActualCards.js";

const actualDiv = document.getElementById("actualDiv");

export default async function createActualSection() {
  // clear the div
  actualDiv.innerHTML = "";

  //------------------------- CREATE ACTUAL FORM---------------------------
  // create the actualFormPostDiv and append it to the actualDiv
  const actualFormPostDiv = document.createElement("div");
  actualFormPostDiv.id = "actualFormPostDiv";
  actualFormPostDiv.className = "card";
  actualDiv.appendChild(actualFormPostDiv);

  // create the actualItemsForm (module)
  createActualItemsForm(actualFormPostDiv);
  
  
  //------- CREATE ACTUAL ITEM CARDS UPON FIRST LOGIN AND GET REQUEST----------
  const actualItemCardsDiv = document.createElement("div");
  actualItemCardsDiv.id = "actualItemCardsDiv";
  actualItemCardsDiv.className = "row";
  actualDiv.appendChild(actualItemCardsDiv);

  // get the actualItems from database (module for FETCH)
  let actualItemsObj = await actualItemsGet();

  // if there is data then render cards
  if (actualItemsObj.actualItems !== undefined) {
    // sort the items by date
    const listOfActualItems = actualItemsObj.actualItems.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    // render the actualItemCards (module)
    createActualCards(listOfActualItems);
  }

  //------- CREATE ACTUAL ITEM CARDS NEW SUBMISSION IN ACTUAL ITEMS FORM----------
  // listen for the actualFormPost POST creation
  const actualItemsForm = document.getElementById("actualItemsForm");
  actualItemsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // grab form data after click
    const formData = new FormData(actualItemsForm);

    // convert FormData to JSON
    const plainFormData = Object.fromEntries(formData.entries());
    let formDataJSONString = JSON.stringify(plainFormData);

    // hacky way to add userID from localStorage to update in Database
    const oneLessThanLength = formDataJSONString.length - 1;
    formDataJSONString = formDataJSONString.slice(0, oneLessThanLength);
    // hacky way to add the userID
    formDataJSONString += `,"userID":"${localStorage.getItem("userID")}"}`;

    // data returned from the database (module for FETCH)
    actualItemsObj = await actualItemsPost(formDataJSONString);

    // if there is data then render -- this needs to be .value after upsert from Mongo
    if (actualItemsObj.actualItems !== undefined) {
      // sort the items by date
      const listOfActualItems = actualItemsObj.actualItems.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );

      // render the actualItemCards (module)
      createActualCards(listOfActualItems);
    }
  });
}
