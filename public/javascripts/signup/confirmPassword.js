const password = document.getElementById("password"); //FORM HTML
const confirmPassword = document.getElementById("confirmPassword"); //DIV HTML
const message = document.createElement("div");
const misMatchPasswordDiv = document.getElementById("misMatchPassword");

const check = function () {
  if (password.value != confirmPassword.value) {
    confirmPassword.style.color = "red";
    message.innerText = "Passwords Don't Match!!!";
    misMatchPasswordDiv.appendChild(message);
    message.style.color = "red";
    message.style.textAlign = "center";
  } else {
    message.innerText = null;
    confirmPassword.style.color = "black";
  }
};

confirmPassword.addEventListener("keyup", check());
