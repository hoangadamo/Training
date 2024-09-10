var firstName = "Khoa", lastName = "Nguyen";
// 2 bien nay nam trong object window
function showName() {
  console.log(this.firstName + " " + this.lastName);
}
window.showName(); //Khoa Nguyen - this tro toi object window
showName(); //Khoa Nguyen - Object goi ham showName van la object window