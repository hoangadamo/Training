var person = {
  firstName: "Khoa",
  lastName: "Nguyen",
  showName: function () {
    console.log(this.firstName + " " + this.lastName);
  },
};

person.showName(); //Khoa Nguyen
