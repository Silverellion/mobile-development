# Trả lời câu hỏi bổ sung Buổi 9

Họ tên: Hoàng Trí Minh Tâm
MSSV: 23669821
Lớp: DHKTPM19BTT

## Câu 1. Giá trị dẫn xuất

`errors` và `valid` là các giá trị dẫn xuất (derived state) được suy ra trực tiếp từ các state nền tảng là `name`, `phone`, `address` và mảng `items` trong giỏ hàng. Việc tính toán lại ở mỗi lần render đảm bảo tính nhất quán tuyệt đối và luôn phản ánh dữ liệu mới nhất.
Nếu dùng `useState` riêng cho `errors` và `valid`:
- Dễ gặp lỗi đồng bộ (out of sync) do ta phải nhớ gọi cập nhật state lỗi ở tất cả các hàm `setName`, `setPhone`, `setAddress`, và khi giỏ hàng thay đổi.
- Bỏ sót bất kỳ điểm cập nhật nào sẽ dẫn đến tình trạng giao diện hiển thị lỗi sai hoặc nút thanh toán mở/khoá sai thời điểm.

## Câu 2. Thứ tự gọi trong hàm submit

Nếu gọi `clear()` giỏ hàng trước `await createOrder(...)`:
- Khi xảy ra lỗi mạng hoặc server gặp sự cố trong quá trình gửi đơn, giỏ hàng trong store (và `AsyncStorage`) đã bị xoá sạch nhưng đơn hàng thực tế chưa được tạo. Người dùng sẽ bị mất toàn bộ danh sách sản phẩm đã chọn mua.
- Việc đặt `clear()` ngay sau `await createOrder(...)` đảm bảo chỉ khi server phản hồi tạo đơn thành công thì app mới dọn sạch giỏ hàng, nếu có lỗi thì giỏ hàng vẫn còn nguyên để người dùng thử lại.

## Câu 3. PUT hay PATCH

- Theo chuẩn RESTful, phương thức `PUT` sẽ thay thế toàn bộ đối tượng (full replacement). Nếu gửi `PUT /users/1` với `{ name, phone }`, `json-server` sẽ ghi đè toàn bộ bản ghi của user đó, khiến các trường khác như `email`, `password` bị xoá mất hoàn toàn khỏi `db.json`.
- Bài này chọn phương thức `PATCH` vì `PATCH` chỉ cập nhật cục bộ (partial update) các trường được gửi kèm (`name` và `phone`), giữ nguyên vẹn các trường thông tin còn lại của người dùng.

## Câu 4. Cập nhật lạc quan (Optimistic Update)

- Ở màn Thông báo, nếu bỏ đoạn hoàn lại `read: false` trong `catch`, khi mất mạng thông báo trên giao diện người dùng vẫn hiển thị là đã đọc (nền trắng), nhưng phía server giá trị `read` vẫn là `false`. Khi người dùng tải lại hoặc mở lại ứng dụng, thông báo sẽ đột ngột chuyển lại thành chưa đọc, gây khó hiểu và giảm trải nghiệm người dùng.
- **Chức năng nên dùng:** Nút thả tim (yêu thích) sản phẩm hoặc thích/thả cảm xúc bình luận: vì đây là thao tác đơn giản, tần suất cao, cần phản hồi tức thì và rủi ro thấp nếu phải rollback.
- **Chức năng không nên dùng:** Thanh toán/Đặt hàng: vì việc trừ tiền hoặc tạo đơn hàng bắt buộc phải có xác nhận chính xác từ hệ thống và đối tác thanh toán trước khi thông báo kết quả cho khách hàng.

## Câu 5. Code bổ sung

Thêm bộ lọc trạng thái ở màn Đơn hàng (`OrdersScreen.tsx`):

```tsx
type FilterStatus = "all" | OrderStatus;
const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("all");

// Lọc dữ liệu hiển thị:
const filteredOrders = useMemo(() => {
  if (selectedStatus === "all") return orders;
  return orders.filter((o) => o.status === selectedStatus);
}, [orders, selectedStatus]);

// Thanh chip lọc trạng thái:
<View style={{ flexDirection: "row", paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}>
  {(["all", "pending", "shipping", "completed", "cancelled"] as const).map((st) => (
    <Pressable
      key={st}
      onPress={() => setSelectedStatus(st)}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: selectedStatus === st ? colors.navy : "#E2E8F0",
      }}
    >
      <Text style={{ color: selectedStatus === st ? "#fff" : colors.text, fontSize: 12, fontWeight: "600" }}>
        {st === "all" ? "Tất cả" : st === "pending" ? "Chờ xác nhận" : st === "shipping" ? "Đang giao" : st === "completed" ? "Hoàn tất" : "Đã huỷ"}
      </Text>
    </Pressable>
  ))}
</View>

// Truyền vào FlatList:
<FlatList data={filteredOrders} ... />
```

Ảnh chụp kết quả màn hình được đính kèm trong báo cáo.

