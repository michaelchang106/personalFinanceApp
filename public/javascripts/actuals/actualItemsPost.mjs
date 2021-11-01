export default async function actualItemsPost(formDataJSONString) {
  try {
    // FETCH POST actualItemsPost
    const res = await fetch("/actualItemsPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: formDataJSONString,
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
