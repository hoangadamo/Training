let options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ["Cake", "Donut"],
  extra: true,
};

// Gán các biến width, height, item1, item2
const {
  size: { width, height },
  items: [item1, item2],
} = options;

// In ra màn hình
console.log(`Width: ${width}`);
console.log(`Height: ${height}`);
console.log(`Item 1: ${item1}`);
console.log(`Item 2: ${item2}`);
