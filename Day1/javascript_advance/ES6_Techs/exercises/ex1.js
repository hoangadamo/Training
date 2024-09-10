let user = {
  name: "Alex",
  years: 28,
};
// Sử dụng destructuring assignment trong JavaScript thực hiện các yêu cầu sau:

// a. Đọc giá trị thuộc tính name và gán vào biến name.
let { name } = user;

// b. Đọc giá trị thuộc tính years và gán vào biến age.
let { years: age } = user;

// c. Đọc giá trị thuộc tính isAdmin và gán vào biến isAdmin (nếu thuộc tính không tồn tại thì giá trị mặc định là false).
let { isAdmin = false } = user;

console.log(name); // Alex
console.log(age); // 28
console.log(isAdmin); // false
