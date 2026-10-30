# Trả lời bài thực hành Git – MoneyNote Lite

## Phần 1. Đọc lịch sử dự án

**Câu 1.** Lúc mới nhận repo, nhánh `main` có **15 commit**. Bốn nhánh còn lại là:

- `feature/giao-dien-moi`
- `feature/tieu-de`
- `feature/xuat-csv`
- `hotfix/sua-loi-cong`

**Câu 2.** Bạn Lan có **7 commit** trong toàn bộ repo (lệnh `git log --all --author="Lan" --oneline`): thêm style cơ bản, định dạng tiền, sửa chữ nút lọc, thêm chân trang, đổi tiêu đề, sửa lỗi tổng và thử font Comic Sans.

**Câu 3.** Dòng có chữ `reduce` trong `js/tinh-toan.js` do **Lê Hùng** viết, ở commit `df17ab7` – "Thêm bộ lọc thu/chi" (ngày 08/10/2026).

## Phần 2. Commit cơ bản và `.gitignore`

**Câu 4.**

- `git diff` hiển thị thay đổi **chưa được đưa vào vùng chờ** (so sánh thư mục làm việc với staging/index).
- `git diff --staged` (hay `--cached`) hiển thị thay đổi **đã được `git add`** (so sánh staging/index với commit gần nhất `HEAD`).

File `.env` thường chứa khóa bí mật, mật khẩu, token API… Không nên đưa lên Git vì lịch sử Git được chia sẻ/công khai, ai có quyền xem repo đều đọc được; kể cả sau khi xóa file thì bí mật vẫn còn trong lịch sử. Vì vậy `.env` phải nằm trong `.gitignore`.

## Phần 3. Nhánh và gộp nhánh (merge)

**Câu 5.** Ở 3.1, nhánh `feature/gioi-thieu` được tạo từ đúng đầu `main` và trong thời gian làm nhánh, `main` không có commit mới. Vì vậy khi gộp, Git chỉ cần dời con trỏ `main` lên commit mới nhất – đó là **fast-forward**, không cần merge commit. Ở 3.2, sau khi tạo nhánh `feature/giao-dien-moi`, `main` đã có thêm commit (file trả lời, phần giới thiệu…), nên hai nhánh đã rẽ đôi. Git phải tạo một **merge commit** để nối hai lịch sử.

**Câu 6.** `feature/giao-dien-moi` đổi màu chủ đạo trong CSS và đổi thẻ `<h1>`; tại thời điểm gộp, `main` chưa sửa các dòng đó nên Git tự động gộp được. Khi gộp `feature/tieu-de`, cả `main` (đã nhận thay đổi `<h1>` từ nhánh giao diện) và `feature/tieu-de` đều sửa **cùng một dòng** `<h1>` so với commit gốc, nên Git không biết chọn bên nào và báo xung đột.

## Phần 4. Hoàn tác (undo)

**Câu 7.** `git revert` tạo một commit **mới** có nội dung đảo ngược commit gây lỗi, nên lịch sử chung được giữ nguyên và người khác chỉ cần `git pull` là có bản sửa. `git reset` lại xóa/dời commit khỏi lịch sử, làm thay đổi các mã commit; nếu commit đó đã được đẩy lên nhánh chung thì phải force-push, gây rối và có thể làm mất việc của người khác.

**Câu 8.**

- `git reset --soft HEAD~1`: chỉ dời `HEAD` về commit trước; thay đổi của commit bị bỏ vẫn nằm **trong vùng chờ** (staged).
- `git reset --mixed HEAD~1` (mặc định): dời `HEAD` và bỏ thay đổi khỏi vùng chờ; thay đổi vẫn nằm trong **thư mục làm việc** nhưng chưa staged.
- `git reset --hard HEAD~1`: dời `HEAD` và **xóa luôn** thay đổi ở cả vùng chờ lẫn thư mục làm việc. Đây là lệnh nguy hiểm, dễ mất code.

## Phần 5. Tìm commit gây lỗi (`bisect`) và lấy bản sửa (`cherry-pick`)

**Câu 9.** Commit gây lỗi là `df17ab7` – **"Thêm bộ lọc thu/chi"** của tác giả **Lê Hùng**. Trong `js/tinh-toan.js`, hàm `tinhTong` dùng:

```js
.reduce(function (tong, g) { return tong + g.soTien; }, '');
```

Giá trị khởi tạo là chuỗi rỗng `''` thay vì số `0`. Vì vậy phép `+` đầu tiên nối chuỗi với số, tạo ra chuỗi `"100000"`, rồi các lần sau tiếp tục **cộng chuỗi** thành `"10000050000"` thay vì cộng số. Sửa lại giá trị khởi tạo thành `0` là hết lỗi.

**Câu 10.** Nếu dùng `git merge hotfix/sua-loi-cong`, Git sẽ mang **cả hai** commit của nhánh hotfix vào `main`, gồm commit sửa lỗi và commit "Thử nghiệm font Comic Sans (chưa chốt)". Như vậy font chữ sẽ bị đổi sang Comic Sans dù commit đó chưa được duyệt, và lịch sử có thêm một merge commit. `cherry-pick` chỉ lấy đúng commit sửa lỗi nên an toàn hơn.

## Phần 6. Làm lại nền nhánh (`rebase`)

**Câu 11.** Sau rebase, mã commit **không còn giống mã cũ**. Rebase không di chuyển nguyên commit mà tạo ra commit mới, cùng nội dung nhưng có **commit cha mới** (nền mới), nên mã hash thay đổi. Không nên rebase nhánh mà người khác đã kéo về máy vì rebase viết lại lịch sử: máy của họ vẫn giữ các commit cũ, khi pull sẽ bị phân nhánh, phải merge/reset hoặc force-push, dễ sinh commit trùng và mất công việc.

## Phần 7. Làm việc với GitHub

**Câu 12.** `git fetch` chỉ tải dữ liệu mới từ remote (commit, nhánh, tag) về kho Git cục bộ, **không** thay đổi nhánh đang làm việc hay file trong thư mục làm việc. `git pull` = `git fetch` rồi **gộp** (merge hoặc rebase) các thay đổi đó vào nhánh hiện tại, nên nó cập nhật luôn code đang làm.
