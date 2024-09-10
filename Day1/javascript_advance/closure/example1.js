function adder(n) {
  var intro = "This answer is ";
  var local = n;
  return function (number) {
    var result = number + local;
    console.log(intro + result);
  };
}
var adder2 = adder(2);
adder2(10);
