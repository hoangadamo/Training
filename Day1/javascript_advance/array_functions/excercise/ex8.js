function camelize(str) {
  return str
    .split("-") // Tách chuỗi thành mảng các từ
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ) // Chuyển đổi từ đầu tiên thành chữ thường, các từ sau thành chữ hoa ở ký tự đầu tiên
    .join(""); // Nối lại
}

console.log(camelize("my-short-string")); // "myShortString"
console.log(camelize("background-color")); // "backgroundColor"
console.log(camelize("list-style-image")); // "listStyleImage"
