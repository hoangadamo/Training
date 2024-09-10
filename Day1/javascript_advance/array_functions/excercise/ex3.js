function filterRange(arr, a, b) {
  return arr.filter((item) => item >= a && item <= b);
}

// Test
let arr = [1, 3, 2, 6, 9, 4];
let filtered = filterRange(arr, 1, 4);

console.log(filtered);
console.log(arr);
