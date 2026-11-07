# Trả lời câu hỏi bổ sung Buổi 8

Họ tên: Hoàng Trí Minh Tâm
MSSV: 23669821
Lớp: DHKTPM19BTT

## Câu 1. Cờ ready

Ở lần render đầu tiên khi khởi động app, giỏ hàng trong Redux store có giá trị mặc định là mảng rỗng `[]`, trong khi hàm bất đồng bộ `loadJSON` từ `AsyncStorage` vẫn đang đọc và chưa hoàn tất. Nếu không có cờ `ready` (chỉ cho phép ghi khi `ready === true`), `useAutoPersist` sẽ chạy ngay lập tức và ghi mảng rỗng đè lên dữ liệu giỏ hàng cũ đã lưu trong `AsyncStorage`. Nhờ cờ `ready`, quá trình ghi chỉ được kích hoạt sau khi đã nạp xong dữ liệu cũ vào store.

## Câu 2. Token giả

Hai điểm không an toàn của cơ chế giả lập:
1. Toàn bộ thông tin tài khoản (kèm mật khẩu dạng plain-text) được lưu tại `db.json` và tải về client để tự so sánh, bất kỳ ai cũng có thể đọc trộm mật khẩu.
2. Token được tự sinh ở client bằng chuỗi ngẫu nhiên không có chữ ký mã hoá, kẻ xấu có thể tự chế token để truy cập trái phép.

Trong hệ thống thực tế:
- Server là bên xác thực mật khẩu (đã được băm an toàn qua bcrypt/argon2) và cấp token có chữ ký số (như JWT) kèm hạn sử dụng.
- Token ở client phải được lưu trong kho lưu trữ bảo mật của hệ điều hành như `Expo SecureStore` (iOS Keychain / Android Keystore), không lưu trong `AsyncStorage` vì `AsyncStorage` không được mã hoá.

## Câu 3. Hai effect trong CartItemRow

Nếu xoá effect đồng bộ `setQty(item.quantity)`:
Khi store được cập nhật số lượng từ nơi khác (ví dụ: giỏ hàng được nạp lại từ `AsyncStorage` sau khi khởi động app, hoặc sau khi xoá đi rồi thêm lại cùng sản phẩm, hoặc khi người dùng thêm sách từ màn Chi tiết), `state` cục bộ `qty` của `CartItemRow` vẫn giữ nguyên giá trị khởi tạo cũ của lần render đầu và không phản ánh số lượng mới trong store.

## Câu 4. Một nguồn state

Nếu `HeartButton` dùng `useState` riêng tại mỗi component, state của nút tim ở màn Home/Lưới sách và ở màn Chi tiết sách sẽ hoàn toàn độc lập và không đồng bộ với nhau (thả tim ở Home thì vào Chi tiết tim vẫn trắng).
Store Redux đóng vai trò là "Single Source of Truth" (một nguồn chân lý duy nhất). Tất cả component ở các màn hình khác nhau đều đọc chung mảng `ids` và gọi `toggle(bookId)` lên cùng một slice, giúp trạng thái yêu thích luôn được đồng bộ tức thì trên toàn ứng dụng.

## Câu 5. Code bổ sung

Thêm nút bấm hiện/ẩn mật khẩu ở màn hình Đăng nhập bằng cách sử dụng state `showPassword`:

```tsx
const [showPassword, setShowPassword] = useState(false);

// JSX:
<View style={{ position: "relative" }}>
  <FormField
    label="Mật khẩu"
    value={password}
    onChangeText={setPassword}
    error={errors.password}
    secureTextEntry={!showPassword}
  />
  <Pressable
    onPress={() => setShowPassword((prev) => !prev)}
    style={{ position: "absolute", right: 12, top: 34, padding: 4 }}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
  >
    <Text style={{ fontSize: 18 }}>{showPassword ? "🙈" : "👁️"}</Text>
  </Pressable>
</View>
```

Ảnh chụp kết quả màn hình được đính kèm trong báo cáo.

