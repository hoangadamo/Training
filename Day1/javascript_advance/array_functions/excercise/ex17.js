// Thập phân sang nhị phân
function Dec2Bin(dec) {
  let bin = "";
  while (dec > 0) {
    bin = (dec % 2) + bin;
    dec = Math.floor(dec / 2);
  }
  return bin;
}

// Nhị phân sang thập phân
function Bin2Dec(bin) {
  let dec = 0;
  const n = bin.length;
  // Iterate through the bin digits
  for (let i = 0; i < n; i++) {
    const digit = parseInt(bin[n - i - 1]);
    dec += digit * Math.pow(2, i);
  }
  return dec;
}

let dec = 1234;
let bin = "1010001101101";
console.log(`Convert ${dec} to bin`, Dec2Bin(dec));
console.log(`Convert ${bin} to dec`, Bin2Dec(bin));
