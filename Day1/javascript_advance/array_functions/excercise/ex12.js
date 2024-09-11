const getAverageAge = (users) => {
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
};

// Ví dụ sử dụng
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 22 },
  { name: "Peter", age: 30 },
];

console.log(getAverageAge(users)); // Kết quả: 25.666666666666668
