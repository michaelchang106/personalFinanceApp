export default function federalTax(salary, marital) {
  let taxAmount = 0;
  // single tax bracket
  if (marital === "Single") {
    if (salary > 0 && salary <= 9875) {
      taxAmount += salary * 0.1;
    } else if (salary > 9875 && salary <= 40125) {
      taxAmount += (salary - 9875) * 0.12 + 987.5;
    } else if (salary > 40125 && salary <= 85525) {
      taxAmount += (salary - 40125) * 0.22 + 4617.5;
    } else if (salary > 85525 && salary <= 163300) {
      taxAmount += (salary - 85525) * 0.24 + 14605.5;
    } else if (salary > 163300 && salary <= 207350) {
      taxAmount += (salary - 163300) * 0.32 + 33271.5;
    } else if (salary > 207350 && salary <= 518400) {
      taxAmount += (salary - 207350) * 0.35 + 47637.5;
    } else if (salary > 518400) {
      taxAmount += (salary - 518400) * 0.37 + 156235;
    }
    // married filing jointly tax bracket
  } else if (marital === "MFJ") {
    if (salary > 0 && salary <= 19750) {
      taxAmount += salary * 0.1;
    } else if (salary > 19750 && salary <= 80250) {
      taxAmount += (salary - 19750) * 0.12 + 1975;
    } else if (salary > 80250 && salary <= 171050) {
      taxAmount += (salary - 80250) * 0.22 + 9235;
    } else if (salary > 171050 && salary <= 326600) {
      taxAmount += (salary - 171050) * 0.24 + 29211;
    } else if (salary > 326600 && salary <= 414700) {
      taxAmount += (salary - 326600) * 0.32 + 66543;
    } else if (salary > 414700 && salary <= 622050) {
      taxAmount += (salary - 414700) * 0.35 + 94735;
    } else if (salary > 622050) {
      taxAmount += (salary - 622050) * 0.37 + 167307.5;
    }
    // married filing separate tax bracket
  } else if (marital === "MFS") {
    if (salary > 0 && salary <= 9875) {
      taxAmount += salary * 0.1;
    } else if (salary > 9875 && salary <= 40125) {
      taxAmount += (salary - 9875) * 0.12 + 987.5;
    } else if (salary > 40125 && salary <= 85525) {
      taxAmount += (salary - 40125) * 0.22 + 4617.5;
    } else if (salary > 85525 && salary <= 163300) {
      taxAmount += (salary - 85525) * 0.24 + 14605.5;
    } else if (salary > 163300 && salary <= 207350) {
      taxAmount += (salary - 163300) * 0.32 + 33271.5;
    } else if (salary > 207350 && salary <= 311025) {
      taxAmount += (salary - 207350) * 0.35 + 47637.5;
    } else if (salary > 311025) {
      taxAmount += (salary - 311025) * 0.37 + 83653.75;
    }
  }
  return taxAmount;
}
