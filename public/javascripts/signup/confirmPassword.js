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
