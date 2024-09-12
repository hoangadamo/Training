function countFrequencies(arr) {
  // Tạo một object lưu trữ số lần xuất hiện của mỗi phần tử
  const frequencyMap = arr.reduce((result, num) => {
    result[num] = (result[num] || 0) + 1;
    return result;
  }, {});
  // Chuyển đổi object thành mảng các object
  const result = Object.keys(frequencyMap).map((key) => {
    const obj = {};
    obj[key] = frequencyMap[key];
    return obj;
  });
  return result;
}

const arr = [1, 2, 8, 4, 1, 3, 1, 8, 3];
console.log(countFrequencies(arr));

// function countFrequencies(arr) {
//   const count = {};
//   for (let i = 0; i < arr.length; i++) {
//     let ele = arr[i];
//     if (count[ele]) {
//       count[ele] += 1;
//     } else {
//       count[ele] = 1;
//     }
//   }
//   console.log(count);
// }
// let arr = [1, 2, 8, 4, 1, 3, 1, 8, 3];
// countFrequencies(arr);
