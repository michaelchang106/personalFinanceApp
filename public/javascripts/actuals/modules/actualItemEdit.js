export default async function actualItemEdit(formDataJSONString) {
  try {
    // FETCH POST actualItemEdit
    const res = await fetch("/actualItemEdit", {
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
    throw new Error("Error sending POST to edit actual item", error);
  }
}

