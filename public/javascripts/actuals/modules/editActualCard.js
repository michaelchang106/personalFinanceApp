import actualItemEdit from "./actualItemEdit.js";
import createActualCards from "./createActualCards.js";

export default async function editActualCard(itemIndex) {
  const actualItemCard = document.getElementById(`actualItemCard${itemIndex}`);

  // grab string details of the item in the Div
  const actualItemString = actualItemCard.textContent;

  // manipulate the string
  const indexOfVendor = 9; // 9 is the length of "Vendors - "
  const indexOfDate = actualItemString.indexOf("Date - ");
  const indexOfAmount = actualItemString.indexOf("Amount - $");
  const indexOfCategory = actualItemString.indexOf("Category - ");
  const indexOfDeleteEdit = actualItemString.indexOf("DeleteEdit");

  const vendor = actualItemString.substr(9, indexOfDate - indexOfVendor);
  const date = actualItemString
    .substr(indexOfDate, indexOfAmount - indexOfDate)
    .substr(7);
  const amount = actualItemString
    .substr(indexOfAmount, indexOfCategory - indexOfAmount)
    .substr(10);
  const category = actualItemString
    .substr(indexOfCategory, indexOfDeleteEdit - indexOfCategory)
    .substr(11);

  // convert the card into a form for editing the card
  actualItemCard.innerHTML = `<form id="actualItemEdit" action="">
      <input type="text" name="vendor" placeholder="Vendor" value=${vendor} required>
      <input type="text" name="date" placeholder="MM/DD/YYYY" value=${date} required>
      <input type="number" name="amount" placeholder="Amount" min="0" step="0.01" value=${amount} required>
      <select id="category" name="category" required>
        <option value="${category}" disable selected hidden>
           ${category} 
        </option>
        <option value="Food & Restaurants">Food & Restaurants</option>
        <option value="Groceries">Groceries</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Travel">Travel</option>
        <option value="Education">Education</option>
        <option value="Auto & Transportation">Auto & Transportation</option>
        <option value="Other">Other</option>
      </select>
      <input type="number" name="index" value=${itemIndex} hidden>
      <button type="submit" id="actualItemEditButton">Submit Edit</button>    
    </form>`;

  // listen for the actualItemEdit POST creation
  let actualItemEditDiv = document.getElementById("actualItemEdit");
  actualItemEditDiv.addEventListener("submit", async (event) => {
    event.preventDefault();
    // grab form data after click
    const formData = new FormData(actualItemEditDiv);

    // convert FormData to JSON
    const plainFormData = Object.fromEntries(formData.entries());
    let formDataJSONString = JSON.stringify(plainFormData);

    // hacky way to add userID from localStorage to update in Database
    let oneLessThanLength = formDataJSONString.length - 1;
    formDataJSONString = formDataJSONString.slice(0, oneLessThanLength);
    // hacky way to add the userID
    formDataJSONString += `,"userID":"${localStorage.getItem("userID")}"}`;

    // get the actualItems from database (module for actualItemEdit FETCH)
    const actualItemsObj = await actualItemEdit(formDataJSONString);

    // if there is data then render cards
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
