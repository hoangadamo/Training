var array = [1, 4, 9, 16];
var map = array.map(function (item) {
  return item * item;
});
console.log(map); // > Array [1,16,81,256]
console.log(array); // > Array [1,4,9,16]

// Hàm map() có chức năng tương tự như vòng lặp forEach. 
// Hàm map() giúp tạo ra một mảng mới với các phần tử là kết quả từ việc thực thi một hàm lên từng phần tử của mảng ban đầu 
// map() không làm thay đổi giá trị của mảng 
// ==> Cú pháp: array.map(function(currentValue, index, arr), thisValue) 