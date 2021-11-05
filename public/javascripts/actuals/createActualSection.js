let actualDiv = document.getElementById("actualDiv");
import createActualItemsForm from "./modules/createActualItemsForm.js";
import actualItemsPost from "./modules/actualItemsPost.js";
import actualItemsGet from "./modules/actualItemsGet.js";
import createActualCards from "./modules/createActualCards.js";

export default async function createActualSection() {
  // clear the div
  actualDiv.innerHTML = "";

  // create the actualFormPostDiv
  let actualFormPostDiv = document.createElement("div");
  actualFormPostDiv.id = "actualFormPostDiv";
  actualFormPostDiv.className = "card";

  // actualFormPostDiv append it to the actualDiv
  actualDiv.appendChild(actualFormPostDiv);

  // create the actualItemsForm
  createActualItemsForm(actualFormPostDiv);

  // create div for actual items cards
  let actualItemCardsDiv = document.createElement("div");
  actualItemCardsDiv.id = "actualItemCardsDiv";
  actualItemCardsDiv.className = "row";
  actualDiv.appendChild(actualItemCardsDiv);

  // get the actualItems from database
  let actualItemsObj = await actualItemsGet();
  // sort the items by date
  actualItemsObj.actualItems.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );

  // if there is data then render
  if (actualItemsObj.actualItems !== undefined) {
    let listOfActualItems = actualItemsObj.actualItems;
    // render the actualItemCards
    createActualCards(listOfActualItems);
  }

  // listen for the actualFormPost Post
  let actualItemsForm = document.getElementById("actualItemsForm");
  actualItemsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // grab form data after click
    const formData = new FormData(actualItemsForm);

    // convert FormData to JSON
    const plainFormData = Object.fromEntries(formData.entries());
    let formDataJSONString = JSON.stringify(plainFormData);

    // hacky way to add userID from localStorage to update in Database
    let oneLessThanLength = formDataJSONString.length - 1;
    formDataJSONString = formDataJSONString.slice(0, oneLessThanLength);
    // hacky way to add the userID
    formDataJSONString += `,"userID":"${localStorage.getItem("userID")}"}`;

    // data returned from the database
    actualItemsObj = await actualItemsPost(formDataJSONString);
    // sort the items by date
    actualItemsObj.actualItems.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );

    // if there is data then render -- this needs to be .value after upsert from Mongo
    if (actualItemsObj.actualItems !== undefined) {
      let listOfActualItems = actualItemsObj.actualItems;

      // render the actualItemCards
      createActualCards(listOfActualItems);
    }
  });
}
