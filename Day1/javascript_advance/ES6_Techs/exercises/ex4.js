swap = (a, b) => {
  let temp = a;
  a = b;
  b = temp;
  console.log(a, b);
};

swap(10, 20);
