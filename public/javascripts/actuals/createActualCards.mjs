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
  let actualItemCardsDiv = document.getElementById("actualItemCardsDiv");
  actualItemCardsDiv.innerHTML = "";

  for (let item of listOfActualItems) {
    let actualItemCards = document.createElement("div");
    actualItemCards.className = "card col-4";
    for (let [key, value] of Object.entries(item)) {
      key = toTitleCase(key);
      if (key === "Date") {
        let tempDate = new Date(value);
        value = tempDate.toLocaleDateString("en-US");
      } else if (key === "Amount") {
        value = dollarUSLocale.format(value);
      }
      let actualItemDetails = document.createElement("div");
      actualItemDetails.innerHTML = `${key} - ${value}`;
      actualItemCards.appendChild(actualItemDetails);
    }
    actualItemCardsDiv.appendChild(actualItemCards);
  }
}
