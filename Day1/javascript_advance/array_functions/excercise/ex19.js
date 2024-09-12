function findConsecutivePairs(arr) {
  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      count++;
    }
  }
  return count;
}
const array = [1, 2, 2, 3, 4, 4, 5, 5, 5, 5];
console.log(findConsecutivePairs(array));
