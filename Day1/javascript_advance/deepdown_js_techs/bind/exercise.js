// Khởi tạo một object bao gồm tên, họ và một phương thức in ra họ tên
var sinhVien = {
  ten: "Van A",
  ho: "Nguyen",
  showFullName: function () {
    console.log(this.ho + " " + this.ten);
  },
};

// Khởi tạo một object sinh viên bao gồm tên, họ
var svA = {
  ten: "Van A",
  ho: "Nguyen",
};
function inHoTen() {
  console.log(this.ho + " " + this.ten);
}
// Sử dụng bind để in ra đầy đủ họ và tên của sinh viên a
var inHoTenCuaSVA = inHoTen.bind(svA);

// Test
sinhVien.showFullName();
inHoTenCuaSVA();
