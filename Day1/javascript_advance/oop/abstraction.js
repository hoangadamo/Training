class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Abstract class Shape cannot be instantiated directly.");
    }
  }
  area() {
    throw new Error("Method 'area()' must be implemented.");
  }
}
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}
const rect = new Rectangle(10, 5);
console.log(rect.area()); // 50
