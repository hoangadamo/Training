var score = [700, 8, 9, 10, 3];

console.log(score.sort()); // ASCII
//Ket qua:[10,3,700,8,9]
console.log(score.sort((a, b) => a - b));


// Sort() dùng để sắp xếp các phần tử trong mảng tăng dần hoặc giảm dần theo thứ tự trong bảng mã ascii, hoặc theo quy tắc trong callback function 
// Cú pháp: array.sort() 
// array.sort(function compareFn(firstEl, secondEl) { … }) 
// + Nếu callback trả về số lớn hơn 0 thì secondEl sẽ đứng trước firstEl. 
// + Nếu trả về số nhỏ hơn hoặc bằng 0 thì giữ nguyên vị trí

