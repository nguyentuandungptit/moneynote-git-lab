// Xuất danh sách giao dịch ra file CSV (mở được bằng Excel)
function xuatCSV(danhSach) {
  const dong = [['Ngày', 'Ghi chú', 'Loại', 'Số tiền']];
  danhSach.forEach(function (g) {
    dong.push([g.ngay, '"' + g.ghiChu.replace(/"/g, '""') + '"', g.loai, g.soTien]);
  });
  const noiDung = '\uFEFF' + dong.map(function (d) { return d.join(','); }).join('\r\n');
  const blob = new Blob([noiDung], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'moneynote.csv';
  a.click();
}
