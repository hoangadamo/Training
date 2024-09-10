// Function thông thường
function hello1() {
  console.log("hello");
}
hello1();

// Arrow function
hello2 = () => {
  console.log("hello");
};
hello2();

// Arrow function having parameter (có thể bỏ qua 2 dấu () nếu chỉ có 1 tham số truyền vào)
hello3 = (name) => {
  console.log("hello", name);
};
hello3("hoang");

// Arrow function ta có thể bỏ qua return
double = (x) => x * 2;
console.log(double(5));

// Kết hợp array function trong trường hợp dùng map, filter, forEach
const numbers = [1, 2, 3, 4];
const newArray = numbers.map((item) => item * 2);
console.log(newArray);
