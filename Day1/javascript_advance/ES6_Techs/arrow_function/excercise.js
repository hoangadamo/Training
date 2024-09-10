// Excercise viết hàm giải phương trình bậc 2 bằng arrow function
const giaiPhuongTrinhBacHai = (a, b, c) => {
  const delta = b * b - 4 * a * c;
  if (delta < 0) {
    return "Phương trình vô nghiệm";
  } else if (delta === 0) {
    const x = -b / (2 * a);
    return `Phương trình có nghiệm kép: x = ${x}`;
  } else {
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    return `Phương trình có hai nghiệm: x1 = ${x1}, x2 = ${x2}`;
  }
};

// Test
console.log(giaiPhuongTrinhBacHai(1, -2, 1)); // nghiem kep x=1
