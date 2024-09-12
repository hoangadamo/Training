const data = [5, 10, 15, 20, 25];
const res = data.reduce((total, currentValue) => {
  return total + currentValue;
});
console.log(res); // 75

// reduce() dùng để thực thi một hàm lên từng phần tử của mảng ( trừ trái sang phải ) với một biến tích lũy để thu về một giá trị duy nhất 
// reduce() không làm thay đổi mảng ban đầu 
// reduce() trả về giá trị sau khi rút gọn 

// Cú pháp: array.reduce(function(total, currentValue, currentIndex, arr), initialValue) 
// + total là biến tích lũy, được trả về sau mỗi lần gọi hàm callback 
// + currentValue là phần tử đang được xử lý 
// + currentIndex là chỉ số của phần tử trong mảng đang được xử lý 
// + arr là mảng hiện tại gọi hàm reduce() 
// + initialValue là giá trị cho tham số thứ nhất. Nếu giá trị này không được cung cấp thì giá trị phần tử đầu tiên của mảng sẽ được sử dụng 