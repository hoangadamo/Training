var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
var result = words.filter(function (word) {
  return word.length > 6;
});
console.log(result); // > Array ["exuberant","destruction","present"]
console.log(words); // > Array ["spray","limit","elite","exuberant","destruction","present"]

// Filter dùng để lọc các phần tử trong mảng thỏa mãn 1 điều kiện nào đó
// + filter() không làm thay đổi mảng ban đầu
// + filter() trả về 1 mảng mới sau khi lọc
// + filter() trả về mảng rỗng nếu không có phần tử nào thỏa mãn điều kiện
// ==> Cú pháp: array.filter(function(currentValue, index, arr), thisValue)
