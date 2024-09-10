var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
var result = words.filter(function (word) {
  return word.length > 6;
});
console.log(result); // > Array ["exuberant","destruction","present"]
console.log(words); // > Array ["spray","limit","elite","exuberant","destruction","present"]
