class Person {
  constructor(name, age) {
    let _age = age; // Thuộc tính private
    this.name = name;
    this.getAge = function () {
      return _age;
    };
    this.setAge = function (newAge) {
      if (newAge > 0) _age = newAge;
    };
  }
}

const person = new Person("Hoang", 22);
console.log(person.name); // Hoang
console.log(person.getAge()); // 22
person.setAge(23);
console.log(person.getAge()); // 23
