export default function stateTax(salary, marital, state) {
  let taxAmount = 0;
  // single or MFS -- California
  if ((marital === "Single" || marital === "MFS") && state === "California") {
    if (salary > 0 && salary <= 8932) {
      taxAmount += salary * 0.01;
    } else if (salary > 8932 && salary <= 21175) {
      taxAmount += (salary - 8932) * 0.02 + 89.32;
    } else if (salary > 21175 && salary <= 33421) {
      taxAmount += (salary - 21175) * 0.04 + 334.18;
    } else if (salary > 33421 && salary <= 46394) {
      taxAmount += (salary - 33421) * 0.06 + 824.02;
    } else if (salary > 46394 && salary <= 58634) {
      taxAmount += (salary - 46394) * 0.08 + 1602.4;
    } else if (salary > 58634 && salary <= 299508) {
      taxAmount += (salary - 58634) * 0.093 + 2581.6;
    } else if (salary > 299508 && salary <= 359407) {
      taxAmount += (salary - 299508) * 0.103 + 24982.88;
    } else if (salary > 359407 && salary <= 599012) {
      taxAmount += (salary - 359407) * 0.113 + 31152.48;
    } else if (salary > 599012) {
      taxAmount += (salary - 599012) * 0.123 + 58227.85;
    }
    // MFJ -- California
  } else if (marital === "MFJ" && state === "California") {
    if (salary > 0 && salary <= 17864) {
      taxAmount += salary * 0.01;
    } else if (salary > 17864 && salary <= 42350) {
      taxAmount += (salary - 17864) * 0.02 + 178.64;
    } else if (salary > 42350 && salary <= 66842) {
      taxAmount += (salary - 42350) * 0.04 + 668.36;
    } else if (salary > 66842 && salary <= 92788) {
      taxAmount += (salary - 66842) * 0.06 + 1648.04;
    } else if (salary > 92788 && salary <= 117268) {
      taxAmount += (salary - 92788) * 0.08 + 3204.8;
    } else if (salary > 117268 && salary <= 599016) {
      taxAmount += (salary - 117268) * 0.093 + 5163.2;
    } else if (salary > 599016 && salary <= 718814) {
      taxAmount += (salary - 599016) * 0.103 + 49965.76;
    } else if (salary > 718814 && salary <= 1198024) {
      taxAmount += (salary - 718814) * 0.113 + 62304.95;
    } else if (salary > 1198024) {
      taxAmount += (salary - 1198024) * 0.123 + 116455.68;
    }
  } else if (
    (marital === "Single" || marital === "MFS") &&
    state === "New York"
  ) {
    if (salary > 0 && salary <= 8500) {
      taxAmount += salary * 0.04;
    } else if (salary > 8500 && salary <= 11700) {
      taxAmount += (salary - 8500) * 0.045 + 340;
    } else if (salary > 11700 && salary <= 13900) {
      taxAmount += (salary - 11700) * 0.0525 + 484;
    } else if (salary > 13900 && salary <= 21400) {
      taxAmount += (salary - 13900) * 0.059 + 600;
    } else if (salary > 21400 && salary <= 80650) {
      taxAmount += (salary - 21400) * 0.0597 + 1042;
    } else if (salary > 80650 && salary <= 215400) {
      taxAmount += (salary - 80650) * 0.0633 + 4579;
    } else if (salary > 215400 && salary <= 1077550) {
      taxAmount += (salary - 215400) * 0.0685 + 13109;
    } else if (salary > 1077550 && salary <= 5000000) {
      taxAmount += (salary - 1077550) * 0.0965 + 72166;
    } else if (salary > 5000000 && salary <= 25000000) {
      taxAmount += (salary - 5000000) * 0.103 + 450683;
    } else if (salary > 25000000) {
      taxAmount += (salary - 25000000) * 0.109 + 2510683;
    }
  } else if (marital === "MFJ" && state === "New York") {
    if (salary > 0 && salary <= 17150) {
      taxAmount += salary * 0.04;
    } else if (salary > 17150 && salary <= 23600) {
      taxAmount += (salary - 17150) * 0.045 + 340;
    } else if (salary > 23600 && salary <= 27900) {
      taxAmount += (salary - 23600) * 0.0525 + 484;
    } else if (salary > 27900 && salary <= 43000) {
      taxAmount += (salary - 27900) * 0.059 + 600;
    } else if (salary > 43000 && salary <= 161550) {
      taxAmount += (salary - 43000) * 0.0597 + 1042;
    } else if (salary > 161550 && salary <= 323200) {
      taxAmount += (salary - 161550) * 0.0633 + 4579;
    } else if (salary > 323200 && salary <= 2155350) {
      taxAmount += (salary - 323200) * 0.0685 + 13109;
    } else if (salary > 2155350 && salary <= 5000000) {
      taxAmount += (salary - 2155350) * 0.0965 + 72166;
    } else if (salary > 5000000 && salary <= 25000000) {
      taxAmount += (salary - 5000000) * 0.103 + 450683;
    } else if (salary > 25000000) {
      taxAmount += (salary - 25000000) * 0.109 + 2510683;
    }
  } else if (state === "Florida" || state === "Texas") {
    return taxAmount;
  }
  return taxAmount;
}
