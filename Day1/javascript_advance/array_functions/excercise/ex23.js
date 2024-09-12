function reverse(n) {
  // Chuyển số thành chuỗi, tách thành mảng các ký tự, đảo ngược mảng và ghép lại thành chuỗi
  let reversedString = n.toString().split("").reverse().join("");
  // Chuyển thành số nguyên
  return parseInt(reversedString, 10);
}

const n = 123456;
const reversed = reverse(n);
console.log(`Số đảo ngược của ${n} là: ${reversed}`);
