const getMaxSubSum = (arr) => {
  let maxSum = 0;
  let currentSum = 0;
  for (let item of arr) {
    currentSum = Math.max(item, currentSum + item);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
};

const arr = [1, -2, 3, 4, -9, 6];
console.log(getMaxSubSum(arr)); // Kết quả: 7
