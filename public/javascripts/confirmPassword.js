let password = document.getElementById("password"); //FORM HTML
let confirmPassword = document.getElementById("confirmPassword"); //DIV HTML
let message = document.createElement("div");
let misMatchPasswordDiv = document.getElementById("misMatchPassword");

let check = function () {
  if (password.value != confirmPassword.value) {
    confirmPassword.style.color = "red";
    message.innerText = "Password Don't Match!!!";
    misMatchPasswordDiv.appendChild(message);
    message.style.color = "red";
  } else {
    message.innerText = null;
    confirmPassword.style.color = "black";
  }
};

confirmPassword.addEventListener("keyup", check());

//   if (document.getElementById('password').value ==
//     document.getElementById('confirm_password').value) {
//     document.getElementById('message').style.color = 'green';
//     document.getElementById('message').innerHTML = 'matching';
//   } else {
//     document.getElementById('message').style.color = 'red';
//     document.getElementById('message').innerHTML = 'not matching';
//   }
// }
// loginSubmission.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const formData = new FormData(loginSubmission);

//   // convert FormData to JSON
//   const plainFormData = Object.fromEntries(formData.entries());
//   const formDataJSONString = JSON.stringify(plainFormData);

//   let loginInfo;

//   try {
//     const res = await fetch("/loginSubmission", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: formDataJSONString,
//     });
//     if (!res.ok) {
//       throw new Error("Response not ok " + res.status);
//     }

//     loginInfo = await res.json();

//   } catch (error) {
//     loginContainerDiv.innerHTML = error.message;
//   }
//   // IF USER IS LOGGED IN SUCCESSFULLY
//   if (loginInfo.userID) {
//     // clear the current HTML and do DOM manipulation
//     loginContainerDiv.innerHTML = "";
//     loginContainerDiv.innerHTML = `Welcome back ${loginInfo.firstName} ${loginInfo.lastName}`;
//     // RUN successfulLogin.js
//     // * this will change the FormSubmission from anonIncomeSubmission to userIncomeSubmission
//     // * add in the ability to add budget and actual stuff

//   // IF USER DID NOT LOGIN SUCCESFULLY
//   } else {
//     alert(loginInfo.error);
//   }
//   // RUN erroredLogin.js
//   // * does anything need to be done upon an errored login? -- i dont think so?
// });
