class Bird {
  speak() {
    console.log("Con chim keo chip chip.");
  }
}
class Cat {
  speak() {
    console.log("Con meo keu meo meo.");
  }
}
function animalSpeak(animal) {
  animal.speak();
}
const bird = new Bird();
const cat = new Cat();
animalSpeak(bird); // Con chim keo chip chip.
animalSpeak(cat); // Con meo keu meo meo.
