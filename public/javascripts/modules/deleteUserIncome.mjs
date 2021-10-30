export default async function deleteUserIncome() {
  let taxAmountDiv = document.getElementById("taxAmountDiv");
  try {
    const res = await fetch("/deleteUserIncome", {
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
    taxAmountDiv.innerHTML = "Deleted";
  } catch (error) {
    taxAmountDiv.innerHTML = error.message;
  }
}
