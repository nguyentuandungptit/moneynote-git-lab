// Các hàm tính toán, không đụng tới giao diện

function tinhTong(danhSach, loai) {
  return danhSach
    .filter(function (g) { return g.loai === loai; })
    .reduce(function (tong, g) { return tong + g.soTien; }, 0);
}

function locTheoLoai(danhSach, loai) {
  if (loai === 'tat-ca') return danhSach;
  return danhSach.filter(function (g) { return g.loai === loai; });
}

function dinhDangTien(soTien) {
  return new Intl.NumberFormat('vi-VN').format(soTien) + ' ₫';
}

if (typeof module !== 'undefined') {
  module.exports = { tinhTong, locTheoLoai, dinhDangTien };
}
