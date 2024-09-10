console.log(Math.max(3, 5, 1)); // 5

let arr = [3, 5, 1];
console.log(Math.max(arr)); // NaN
console.log(Math.max(...arr)); // 5

// Truyền nhiều mảng
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

console.log(Math.max(...arr1, ...arr2)); // 8
// Kết hợp giá trị bình thường
console.log(Math.max(1, ...arr1, 25, ...arr2, 2)); // 25

// Kết hợp các mảng
let merged = [...arr1, ...arr2];
console.log(merged); // [1, -2, 3, 4, 8, 3, -8, 1]

// Tách 1 mảng thành từng chuỗi ký tự
let str = "Hello";
console.log([...str]); // H,e,l,l,o
