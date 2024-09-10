class Person {
  constructor(firstName, lastName, old, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.old = old;
    this.address = address;
  }
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

var ps = new Person("Van A", "Nguyen", 25, "Ha Noi");

console.log(ps.getFullName());
