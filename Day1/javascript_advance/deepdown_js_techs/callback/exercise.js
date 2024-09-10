function transform(numbers, callback) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    const transformed = callback(numbers[i]);
    result.push(transformed);
  }
  return result;
}

function double(num) {
  return num * 2;
}

// Test
var mang = [1, 2, 5, 7, 4, 7, 8];
console.log(transform(mang, double));
