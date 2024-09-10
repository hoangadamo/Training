class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} is making a sound.`);
  }
}
class Dog extends Animal {
  speak() {
    console.log(`${this.name} is barking.`);
  }
}
const dog = new Dog("Dog");
dog.speak(); // Dog is barking.
