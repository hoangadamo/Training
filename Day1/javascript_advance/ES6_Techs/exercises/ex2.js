function topAge(people) {
  // Nếu people là rỗng thì hàm trên trả về null.
  if (Object.keys(people).length === 0) {
    return null;
  }
  let maxAge = -1;
  let maxPerson = null;

  for (let person in people) {
    if (people[person] > maxAge) {
      maxAge = people[person];
      maxPerson = person;
    }
  }
  return maxPerson;
}
// Test
let people = {
  Ana: 25,
  Alex: 28,
  John: 27,
};
console.log(topAge(people)); // Kết quả: "Alex"
