const object1 = {
  fullName: "Anonystick",
  occupation: "Software developer",
  age: 31,
  website: "https://annonystick.com",
};

// In ra tất cả thông tin trên cùng 1 dòng
console.log(
  `${object1.fullName}, ${object1.occupation}, ${object1.age}, ${object1.website}`
);

// In ra tất cả thông tin trên từng dòng
console.log(`Full Name: ${object1.fullName}`);
console.log(`Occupation: ${object1.occupation}`);
console.log(`Age: ${object1.age}`);
console.log(`Website: ${object1.website}`);

// Tạo 1 object 2 với thông tin giống object phía trên
const object2 = { ...object1 };

// Tạo 1 object thứ 3 và thay đổi fullname là “Tom”, age là “25”
const object3 = { ...object1, fullName: "Tom", age: 25 };

console.log(object2);
console.log(object3);
