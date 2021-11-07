import actualItemDelete from "./actualItemDelete.js";
import editActualCard from "./editActualCard.js";

// FOR USD CURRENCY STRING CONVERSION
const dollarUSLocale = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// FOR STRING TITLE CASE CONVERSION
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function createActualCards(listOfActualItems) {
  const actualItemCardsDiv = document.getElementById("actualItemCardsDiv");
  actualItemCardsDiv.innerHTML = "";

  // LOOP THRU LIST OF ACTUAL ITEMS AND CREATE DIVS FOR THEM (OUTER FOR LOOP)
  for (let [itemIndex, item] of listOfActualItems.entries()) {
    const actualItemCards = document.createElement("div");
    actualItemCards.className = "card col-4 actualCard m-1";
    actualItemCards.id = `actualItemCard${itemIndex}`;

    // LOOP THRU THE ITEM DETAILS AND RENDER THEM (INNER FOR LOOP)
    for (let [key, value] of Object.entries(item)) {
      key = toTitleCase(key);
      if (key === "Date") {
        const tempDate = new Date(value);
        value = tempDate.toLocaleDateString("en-US");
      } else if (key === "Amount") {
        value = dollarUSLocale.format(value);
      }

      // create div and insert the key value details
      const actualItemDetailsDiv = document.createElement("div");
      actualItemDetailsDiv.innerHTML = `<strong>${key}</strong> - ${value}`;
      actualItemCards.appendChild(actualItemDetailsDiv);
    } // ------------------(INNER FOR LOOP END)

    // append the card to the div
    actualItemCardsDiv.appendChild(actualItemCards);

    // create div and insert delete buttons
    const actualEditDeleteDiv = document.createElement("div");
    actualItemCards.appendChild(actualEditDeleteDiv);
    actualEditDeleteDiv.className = "d-flex justify-content-center";

    // create the delete buttons by itemIndex number
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = `<button type='button' id='actualItemDeleteButton${itemIndex}' class='btn btn-danger m-1'>Delete</button>`;
    // deleteButton.className = "btn btn-danger m-1";
    actualEditDeleteDiv.appendChild(deleteButton);

    // add listeners for delete button by itemIndex number (module for FETCH)
    document
      .getElementById(`actualItemDeleteButton${itemIndex}`)
      .addEventListener("click", () => {
        actualItemDelete(itemIndex);
      });

    // create div and insert Edit buttons
    actualItemCards.appendChild(actualEditDeleteDiv);

    // create the Edit buttons by itemIndex number
    const EditButton = document.createElement("span");
    EditButton.innerHTML = `<button type='button' id='actualItemEditButton${itemIndex}' class='btn btn-secondary m-1'>Edit</button>`;
    actualEditDeleteDiv.appendChild(EditButton);

    // add listeners for Edit button by itemIndex number (module for FETCH)
    document
      .getElementById(`actualItemEditButton${itemIndex}`)
      .addEventListener("click", () => {
        editActualCard(itemIndex);
      });
  } //--------------------(OUTER FOR LOOP END)
}
