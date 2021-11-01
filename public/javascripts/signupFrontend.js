const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  //convert
  const formData = new FormData(registerForm);
  console.log(formData);
  // convert FormData to JSON
  const plaidnFormData = Object.fromEntries(formData.entries()); //Iterates and converst each entry to a JSON
  const formDataJSON = JSON.stringify(plaidnFormData);

  const res = await fetch("/signup/create", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJSON, // body data type must match "Content-Type" header
  });

  const resJSON = await res.json();

  if (resJSON.passwordMismatch) {
    alert("PASSWORDS DON'T MATCH!");
  } else {
    if (resJSON.success) {
      document.location.href = "/";
    } else {
      alert("User Name taken");
    }
  }
});
