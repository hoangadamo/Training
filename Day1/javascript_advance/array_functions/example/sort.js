var score = [700, 8, 9, 10, 3];

console.log(score.sort()); // ASCII
//Ket qua:[10,3,700,8,9]

console.log(score.sort((a, b) => a - b));
