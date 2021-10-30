export default function ficaTax(salary, marital) {
  let taxAmount = 0;

  //social security tax
  if (salary > 142800) {
    taxAmount += 8853.6;
  } else {
    taxAmount += salary * 0.062;
  }

  //medicare tax
  if (marital === "Single" || marital === "MFS") {
    if (salary > 0 && salary <= 200000) {
      taxAmount += 0.0145 * salary;
    } else if (salary > 200000) {
      taxAmount += (salary - 200000) * 0.009;
    }
  } else if (marital === "MFJ") {
    if (salary > 0 && salary <= 250000) {
      taxAmount += 0.0145 * salary;
    } else if (salary > 250000) {
      taxAmount += (salary - 250000) * 0.009;
    }
  }

  return taxAmount;
}
