let ficaTax = (salary, marital) => {
  let taxAmount = 0;

  //social security tax
  if (salary > 142800) {
    taxAmount += 8853.6;
  } else {
    taxAmount += salary * 0.062;
  }

  //medicare tax
  if (salary > 200000 && (marital === "Single" || marital === "MFS")) {
    taxAmount += (salary - 200000) * 0.009 + 2900;
  } else if (salary <= 200000 && (marital === "Single" || marital === "MFS")) {
    taxAmount += salary * 0.0145;
  } else if (salary > 250000 && marital === "MFJ") {
    taxAmount += (salary - 250000) * 0.009 + 3625;
  } else if (salary <= 250000 && marital === "MFJ") {
    taxAmount += salary * 0.0145;
  }

  return taxAmount;
};

module.exports = ficaTax;
