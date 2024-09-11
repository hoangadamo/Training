const sortByAge = (users) => {
  return users.sort((a, b) => a.age - b.age);
};

// Ví dụ sử dụng
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 22 },
  { name: "Peter", age: 30 },
];

console.log(sortByAge(users));
