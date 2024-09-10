var array = [5, 12, 8, 130, 44];
var found = array.find(function (element) {
  return element > 10;
});
console.log(found); // > 12
console.log(array); // > Array [5,12,8,130,44]
