# Trả lời câu hỏi bổ sung Buổi 7

Họ tên: Hoàng Trí Minh Tâm
MSSV: 23669821
Lớp: DHKTPM19BTT

## Câu 1. Cấu trúc điều hướng

BookDetail được đăng ký ở Stack để màn hình hiện phủ lên Tab Bar và có sẵn nút quay lại do Stack tạo ra. Nếu đặt trong Tab thì BookDetail trở thành một tab riêng, Tab Bar vẫn hiện và không có nút quay lại.

## Câu 2. Redux

Reducer của Redux Toolkit chạy trên một bản nháp do Immer cung cấp. Immer so sánh bản nháp với state cũ rồi tạo ra state mới, nên state gốc không bị sửa trực tiếp. Nếu bỏ useMemo thì kết quả hiển thị vẫn đúng. Hậu quả là phép reduce chạy lại ở mọi lần render, kể cả khi items không đổi.

## Câu 3. Promise.all

Promise.all bị reject khi một request lỗi, nên Home hiện ErrorView dù getBooks đã thành công. Với Promise.allSettled, ta kiểm tra từng kết quả: getBooks thành công thì lưu danh sách sách, getCategories lỗi thì để mảng danh mục rỗng. Đánh đổi là phải tự xử lý lỗi riêng cho từng request, và nút Thử lại phải chạy lại đúng request bị lỗi.

## Câu 4. Debounce

Nếu đặt setTimeout trong onChangeText thì mỗi lần gõ tạo một timer mà không huỷ timer trước, nên gõ 10 ký tự vẫn lọc 10 lần (chỉ chậm 400 ms). Hàm dọn dẹp của useEffect huỷ timer cũ trước khi tạo timer mới. Nó cũng huỷ timer khi component bị gỡ, nên không gọi setState trên component đã unmount.

## Câu 5. Sắp xếp giá

Thêm state sort và sắp xếp trên bản sao của mảng đã lọc trong visibleBooks:

```tsx
const [sort, setSort] = useState<"asc" | "desc" | null>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (sort === null) return filtered;
  return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
```

Ảnh chụp kết quả nằm trong file báo cáo Word.
