import successfulLogin from "./successfulLogin.js";

const loginPost = document.getElementById("loginPost"); //FORM HTML

let loginData;
loginPost.addEventListener("submit", async (event) => {
  event.preventDefault();

  // grab FormData from HTML
  const formData = new FormData(loginPost);

  // convert FormData to plainForm
  const plainFormData = Object.fromEntries(formData.entries());

  //store userID and password to localStorage
  localStorage.setItem("userID", plainFormData.username);
  localStorage.setItem("password", plainFormData.password);

  // convert FormData to JSON
  const formDataJSONString = JSON.stringify(plainFormData);

  // attempt to FETCH data from database
  try {
    const res = await fetch("/loginPost", {
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

    //THE JSON with the USERS DATA returned from database
    loginData = await res.json();

    //Error handling
  } catch (error) {
    throw new Error("Error sending POST to login user", error);
  }

  //run successfulLogin module
  successfulLogin(loginData);
});
