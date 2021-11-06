const taxAmountDiv = document.getElementById("taxAmountDiv");

export default function renderTaxInformationHTML(taxJson) {
  for (const [key, value] of Object.entries(taxJson)) {
    const divTax = document.createElement("div");
    divTax.className = "col-12 col-md-3 card tax";
    divTax.innerText = `${key} - ${value}`;

    taxAmountDiv.appendChild(divTax);
  }
}
