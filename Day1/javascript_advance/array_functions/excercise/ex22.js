function calculateBill(minutes) {
  const baseFee = 25000;
  let totalCost = baseFee;
  if (minutes <= 50) {
    totalCost += minutes * 600;
  } else if (minutes <= 200) {
    totalCost += 50 * 600 + (minutes - 50) * 400;
  } else {
    totalCost += 50 * 600 + 150 * 400 + (minutes - 200) * 200;
  }
  return totalCost;
}
const minutes = 250;
const bill = calculateBill(minutes);
console.log(`Cước tính: ${bill} đồng`);
