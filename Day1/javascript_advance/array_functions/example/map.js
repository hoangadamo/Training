var array = [1, 4, 9, 16];
var map = array.map(function (item) {
  return item * item;
});
console.log(map); // > Array [1,16,81,256]
console.log(array); // > Array [1,4,9,16]
