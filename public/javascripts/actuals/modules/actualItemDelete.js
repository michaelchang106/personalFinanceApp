export default async function actualItemDelete(itemIndex) {
  const actualItemCard = document.getElementById(`actualItemCard${itemIndex}`);
  try {
    await fetch("/actualItemDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: `{"userID":"${localStorage.getItem(
        "userID"
      )}", "itemIndex":"${itemIndex}"}`,
    });
  } catch (error) {
    throw new Error("Error sending POST to delete actual item", error);
  } finally {
    //deletes the card from the HTML
    actualItemCard.remove();
  }
}
