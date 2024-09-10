function sum(a, b) {
  return a + b;
}
// alert(sum(1, 2, 3, 4, 5));
console.log(sum(1, 2, 3, 4, 5)); // result: 3

function sumAll(...args) {
  //args is the name for the array
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}
console.log(sumAll(1)); //1
console.log(sumAll(1, 2)); //3
console.log(sumAll(1, 2, 3)); //6

// Chọn các đối số đầu tiên và thêm các phần còn lại vào phía sau
function showName(firstName, lastName, ...titles) {
  console.log(firstName, " ", lastName); // A B
  //   alert(titles[0]);
  //   alert(titles[1]);
  //   alert(titles.length);
  console.log(titles[0]); // C
  console.log(titles[1]); // D
  console.log(titles.length); // 2
}

showName("A", "B", "C", "D");
