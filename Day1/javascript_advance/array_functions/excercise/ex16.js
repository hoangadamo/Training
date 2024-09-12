function isLeapYear(year) {
  let check = false;
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {
        check = true;
      }
    } else {
      check = true;
    }
  }
  return check;
}

console.log(isLeapYear(2008));
