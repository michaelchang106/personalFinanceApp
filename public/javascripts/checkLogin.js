// import successfulLogin.js require successfulLogin

// checkLogin.js
// check login
// business logic to check if user name and password OK
// if successful - grab {dataJSON} from Mongoose for User
// successfulLogin.js({dataJSON})

//incorrect login
// don't render HTML

let loginSubmission = document.getElementById("loginSubmission"); //FORM HTML
let loginContainerDiv = document.getElementById("loginContainerDiv"); //DIV HTML

loginSubmission.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginSubmission);

  // convert FormData to JSON
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJSONString = JSON.stringify(plainFormData);

  let loginInfo;

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

    loginInfo = await res.json();
  
  } catch (error) {
    loginContainerDiv.innerHTML = error.message;
  }
  // IF USER IS LOGGED IN SUCCESSFULLY
  if (loginInfo.userID) {
    // clear the current HTML and do DOM manipulation
    loginContainerDiv.innerHTML = "";
    loginContainerDiv.innerHTML = `Welcome back ${loginInfo.firstName} ${loginInfo.lastName}`;
    // RUN successfulLogin.js
    // * this will change the FormSubmission from anonIncomeSubmission to userIncomeSubmission
    // * add in the ability to add budget and actual stuff


  // IF USER DID NOT LOGIN SUCCESFULLY
  } else {
    alert(loginInfo.error);
  }
  // RUN erroredLogin.js
  // * does anything need to be done upon an errored login? -- i dont think so?
});
