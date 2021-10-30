import successfulLogin from "./modules/successfulLogin.mjs";

let loginSubmission = document.getElementById("loginSubmission"); //FORM HTML
let loginContainerDiv = document.getElementById("loginContainerDiv"); //DIV HTML

let loginData;
loginSubmission.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginSubmission);

  // convert FormData to JSON
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJSONString = JSON.stringify(plainFormData);

  // attempt to FETCH data from database
  try {

    const res = await fetch("/loginSubmission", {
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

    //store userID to localStorage
    localStorage.setItem("userID", loginData.userID);

    //Error handling
  } catch (error) {
    loginContainerDiv.innerHTML = error.message;
  }

  //run successfulLogin module
  successfulLogin(loginData);
});

