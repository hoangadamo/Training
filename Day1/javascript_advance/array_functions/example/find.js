var array = [5, 12, 8, 130, 44];
var found = array.find(function (element) {
  return element > 10;
});
console.log(found); // > 12
console.log(array); // > Array [5,12,8,130,44]

// Dùng để lọc phần tử trong mảng và trả về giá trị đầu tiên tìm thấy trong mảng hoặc undefined nếu không tìm thấy. 
// find() không làm thay đổi mảng ban đầu 
// Cú pháp: array.find(function(currentValue, index, arr),thisValue) 