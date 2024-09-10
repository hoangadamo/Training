const data = [5, 10, 15, 20, 25];
const res = data.reduce((total, currentValue) => {
  return total + currentValue;
});
console.log(res); // 75
