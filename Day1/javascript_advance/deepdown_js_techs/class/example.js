class SinhVien {
  // constructor
  constructor(hoten, gioiTinh, MSSV, namSinh) {
    this.hoten = hoten;
    this.gioiTinh = gioiTinh;
    this.MSSV = MSSV;
    this.namSinh = namSinh;
  }
  // methods
  hocBai() {
    console.log("Dang hoc bai...");
  }
  diNgu() {
    console.log("Dang ngu...");
  }
  xemPhim() {
    console.log("Dang xem phim...");
  }
}

// Test
var sv = new SinhVien("Cao Viet Hoang", "male", "19020819", "2001");
console.log(sv);
sv.diNgu();
