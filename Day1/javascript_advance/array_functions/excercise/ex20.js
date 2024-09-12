function findMaxIndices(arr) {
  const max = Math.max(...arr);
  const indices = [];
  arr.forEach((num, index) => {
    if (num === max) {
      indices.push(index);
    }
  });
  return indices;
}
const array = [1, 3, 7, 7, 2, 7, 4];
console.log(findMaxIndices(array));
