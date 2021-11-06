import createActualCards from "./createActualCards.js";

export default async function actualItemDelete(itemIndex) {
  let res;
  try {
    res = await fetch("/actualItemDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: `{"userID":"${localStorage.getItem(
        "userID"
      )}", "itemIndex":"${itemIndex}"}`,
    });
    if (!res.ok) {
      throw new Error("Response not ok " + res.status);
    }
  } catch (error) {
    throw new Error("Error sending POST to delete actual item", error);
  } finally {
    const actualItemsObj = await res.json();
    console.log(actualItemsObj);
    // if there is data then render cards
    if (actualItemsObj.actualItems !== undefined) {
      // sort the items by date
      const listOfActualItems = actualItemsObj.actualItems.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );
      // render the actualItemCards (module)
      createActualCards(listOfActualItems);
    }
  }
}
