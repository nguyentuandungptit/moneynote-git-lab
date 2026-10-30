// Hiển thị dữ liệu lên trang
const giaoDich = [
  { ngay: '2026-10-01', ghiChu: 'Lương part-time', loai: 'thu', soTien: 3500000 },
  { ngay: '2026-10-03', ghiChu: 'Ăn sáng', loai: 'chi', soTien: 25000 },
  { ngay: '2026-10-05', ghiChu: 'Đổ xăng', loai: 'chi', soTien: 80000 },
  { ngay: '2026-10-08', ghiChu: 'Mua giáo trình', loai: 'chi', soTien: 150000 },
  { ngay: '2026-10-15', ghiChu: 'Học bổng kỳ 1', loai: 'thu', soTien: 5000000 },
  { ngay: '2026-10-18', ghiChu: 'Vé xem phim', loai: 'chi', soTien: 110000 }
];

let boLoc = 'tat-ca';
let tuKhoa = '';

function veDanhSach(ds) {
  const ul = document.getElementById('danhSach');
  ul.innerHTML = '';
  ds.forEach(function (g) {
    const li = document.createElement('li');
    const ten = document.createElement('span');
    ten.textContent = g.ngay + ' – ' + g.ghiChu;
    const tien = document.createElement('span');
    tien.className = g.loai;
    tien.textContent = (g.loai === 'thu' ? '+ ' : '− ') + dinhDangTien(g.soTien);
    li.append(ten, tien);
    ul.append(li);
  });
}

function capNhat() {
  let ds = locTheoLoai(giaoDich, boLoc);
  if (tuKhoa) {
    ds = ds.filter(function (g) {
      return g.ghiChu.toLowerCase().includes(tuKhoa.toLowerCase());
    });
  }
  veDanhSach(ds);
}

document.querySelectorAll('.bo-loc button').forEach(function (nut) {
  nut.addEventListener('click', function () {
    document.querySelectorAll('.bo-loc button').forEach(function (n) { n.classList.remove('dang-chon'); });
    nut.classList.add('dang-chon');
    boLoc = nut.dataset.loc;
    capNhat();
  });
});

document.getElementById('oTimKiem').addEventListener('input', function (e) {
  tuKhoa = e.target.value;
  capNhat();
});

document.getElementById('tongThu').textContent = dinhDangTien(tinhTong(giaoDich, 'thu'));
document.getElementById('tongChi').textContent = dinhDangTien(tinhTong(giaoDich, 'chi'));
capNhat();
