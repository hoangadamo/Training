// Lọc ra các giá trị id là số dương trong mỗi object.
function filterPositiveIds(arr) {
  return arr.filter((item) => typeof item.id === "number" && item.id > 0);
}
let arr = [
  { id: 15 },
  { id: -1 },
  { id: 0 },
  { id: 3 },
  { id: "12" },
  { id: null },
  { id: NaN },
  { id: "undefined" },
];

console.log(filterPositiveIds(arr));
