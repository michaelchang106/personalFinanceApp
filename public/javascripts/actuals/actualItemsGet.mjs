export default async function actualItemsGet() {
  try {
    // FETCH POST actualItemsPost
    const res = await fetch("/actualItemsGet", {
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

    // assign actualItem the response json
    return await res.json();

    //catch error
  } catch (error) {
    return error.message;
  }
}
