import actualItemDelete from "./actualItemDelete.js";

const dollarUSLocale = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default function createActualCards(listOfActualItems) {
  const actualItemCardsDiv = document.getElementById("actualItemCardsDiv");
  actualItemCardsDiv.innerHTML = "";

  for (let [itemIndex, item] of listOfActualItems.entries()) {
    const actualItemCards = document.createElement("div");
    actualItemCards.className = "card col-4";
    actualItemCards.id = `actualItemCard${itemIndex}`;
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
      actualItemDetailsDiv.innerHTML = `${key} - ${value}`;
      actualItemCards.appendChild(actualItemDetailsDiv);
    }
    // append the card to the div
    actualItemCardsDiv.appendChild(actualItemCards);

    // create div and insert delete buttons
    const actualDeleteDiv = document.createElement("div");
    actualItemCards.appendChild(actualDeleteDiv);

    // create the delete buttons by itemIndex number
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = `<button type='button' id='actualItemDeleteButton${itemIndex}'>Delete</button>`;
    actualDeleteDiv.appendChild(deleteButton);

    // add listeners for delete button by itemIndex number (module for FETCH)
    document
      .getElementById(`actualItemDeleteButton${itemIndex}`)
      .addEventListener("click", () => {
        actualItemDelete(itemIndex);
      });
  }
}
