const users = [
  { name: "John", surname: "Doe", id: 1 },
  { name: "Jane", surname: "Smith", id: 2 },
  { name: "Peter", surname: "Johnson", id: 3 },
];

const newUsers = users.map((user) => ({
  id: user.id,
  fullName: `${user.name} ${user.surname}`,
}));

console.log(newUsers);
