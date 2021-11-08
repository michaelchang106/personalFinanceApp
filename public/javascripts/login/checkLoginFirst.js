import successfulLogin from "./successfulLogin.js";

async function checkLocalStorageLoginInfo() {
  if (
    localStorage.getItem("userID") !== undefined &&
    localStorage.getItem("userID") !== null &&
    localStorage.getItem("password") !== undefined &&
    localStorage.getItem("password") !== null
  ) {
    let loginData;
    let formDataJSONString = {
      username: localStorage.getItem("userID"),
      password: localStorage.getItem("password"),
    };

    formDataJSONString = JSON.stringify(formDataJSONString);

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

      //store userID to localStorage

      //Error handling
    } catch (error) {
      throw new Error("Error sending POST to login user", error);
    }

    //run successfulLogin module
    successfulLogin(loginData);
  }
}

checkLocalStorageLoginInfo();
