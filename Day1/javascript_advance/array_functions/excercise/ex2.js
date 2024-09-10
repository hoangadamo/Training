// a
let styles = ["Jazz", "Blues"];
// b
styles.push("Rock-n-Roll");
// c
let middleEle = (styles.length - 1) / 2;
styles[middleEle] = "Classic";
// d
let firstElement = styles.shift();
console.log(firstElement);
console.log(styles);
// e
styles.unshift("Rap", "Reggae");
console.log(styles);
