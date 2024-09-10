function copySorted(arr) {
  return [...arr].sort();
}

let arr = ["HTML", "JavaScript", "CSS"];
let sorted = copySorted(arr);
console.log(sorted); // ["CSS", "HTML", "JavaScript"]
console.log(arr); // ["HTML", "JavaScript", "CSS]
