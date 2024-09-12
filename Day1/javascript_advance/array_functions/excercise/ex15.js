function findMostFrequent(arr) {
    // Tạo một object lưu trữ số lần xuất hiện của mỗi phần tử
    const frequencyMap = arr.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
    // Tìm phần tử có số lần xuất hiện nhiều nhất
    const mostFrequent = Object.keys(frequencyMap).reduce((a, b) => 
        frequencyMap[a] > frequencyMap[b] ? a : b
    );
    return parseInt(mostFrequent);
}
const arr = [1, 2, 8, 4, 1, 3, 1, 8, 3];
console.log(findMostFrequent(arr));
