class Student {
  constructor(firstName, lastName, old, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.old = old;
    this.address = address;
  }
  diHoc(subject) {
    console.log(`đi học ${subject}`);
  }
  diLamThem() {
    console.log("đi làm thêm");
  }
}

var sv1 = new Student("Van A", "Nguyen", 22, "Ha Noi");
var sv2 = new Student("Van B", "Le", 23, "Hai Phong");

sv1.diHoc("toán");
sv2.diHoc("văn");
