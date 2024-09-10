let John = { name: "John", age: 25 };
let Pete = { name: "Pete", age: 30 };
let Mary = { name: "Mary", age: 28 };

let users = [John, Pete, Mary];
// Bạn có một mảng các đối tượng người dùng, mỗi đối tượng có user.name. Viết code chuyển đổi nó thành một mảng tên.
let names = users.map((user) => user.name);

console.log(names); // ["John", "Pete", "Mary"]
