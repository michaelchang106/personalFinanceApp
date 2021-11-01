let actualDiv = document.getElementById("actualDiv");
import createActualItemsForm from "./createActualItemsForm.mjs";
import actualItemsPost from "./actualItemsPost.mjs";
import actualItemsGet from "./actualItemsGet.mjs";
import createActualCards from "./createActualCards.mjs";

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
  // if there is data then render
  if (actualItemsObj !== null) {
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

    // if there is data then render
    if (actualItemsObj !== null) {
      let listOfActualItems = actualItemsObj.actualItems;
      // render the actualItemCards
      createActualCards(listOfActualItems);
    }
  });
}
