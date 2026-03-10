my-english-app/
├── public/
├── src/
│   ├── assets/             # Hình ảnh, âm thanh (nếu có)
│   ├── components/         # Các mảnh UI có thể tái sử dụng
│   │   ├── ui/             # Button.jsx, Input.jsx, Card.jsx (UI cơ bản)
│   │   ├── form/           # QAForm.jsx (Form nhập câu hỏi & trả  lời)
│   │   └── practice/       # FlashCard.jsx (Thẻ hiển thị lúc học)
│   ├── pages/              # Các trang chính của web
│   │   ├── Home.jsx        # Trang chủ: Chọn chế độ học, xem thống kê
│   │   ├── ManageQA.jsx    # Trang quản lý: Nhập, sửa, xóa các cặp Q-A
│   │   └── Practice.jsx    # Trang luyện tập: Random hiển thị thẻ để luyện phản xạ
│   ├── context/            # Quản lý State toàn cục (Context API hoặc Zustand/Redux)
│   │   └── QAContext.jsx   # Lưu trữ danh sách câu hỏi để dùng chung giữa các trang
│   ├── hooks/              # Custom Hooks (Rất hữu ích cho app này)
│   │   └── useRandomQA.js  # Hook xử lý logic random không lặp lại
│   ├── utils/              # Các hàm logic hỗ trợ
│   │   └── shuffle.js      # Hàm trộn mảng ngẫu nhiên (Fisher-Yates shuffle)
│   ├── App.jsx             # Cấu hình Routing (chuyển trang) và Layout chính
│   ├── main.jsx            # Entry point của React
│   └── index.css           # Cấu hình Tailwind (@import "tailwindcss")
├── package.json
└── vite.config.js


1. Bức tranh toàn cảnh (Kiến trúc App)
Ứng dụng hoạt động dựa trên 3 trụ cột chính:

Dữ liệu toàn cục (Context): Đóng vai trò như một "Database" thu nhỏ ngay trên trình duyệt.

Giao diện (Pages & Components): Đóng vai trò như "Views", chỉ nhận dữ liệu để hiển thị và bắt sự kiện click của người dùng.

Logic (Hooks & Utils): Đóng vai trò như "Controllers", xử lý thuật toán (random) và điều phối luồng chạy.

2. Trái tim của hệ thống: Luồng quản lý dữ liệu (QAContext.jsx)
File này là nơi quan trọng nhất, nắm giữ toàn bộ state (trạng thái) của ứng dụng.

Nhiệm vụ: Lưu trữ mảng qaList chứa tất cả các câu hỏi của bạn.

Đồng bộ ổ cứng: Mỗi khi qaList thay đổi (thêm, xóa, import), useEffect sẽ tự động kích hoạt và ghi đè mảng mới này vào localStorage của trình duyệt. Nhờ đó, F5 hay tắt máy không bị mất dữ liệu.

Cung cấp API: Cung cấp các hàm (addQA, deleteQA, deleteAllQA, importQAList) cho các file khác gọi đến để thao tác với dữ liệu.

3. Luồng Quản lý & Nhập liệu (Trang ManageQA)
Đường đi của dữ liệu: Người dùng gõ phím ➔ QAForm ➔ ManageQA ➔ QAContext ➔ localStorage

pages/ManageQA.jsx: Là trang tổng huy động. Nó gọi QAContext ra để lấy danh sách (qaList) hiển thị lên màn hình, và lấy các hàm (deleteQA, deleteAllQA) gắn vào các nút "Xóa".

components/form/QAForm.jsx: Chỉ làm một nhiệm vụ duy nhất là nhận chữ người dùng gõ, hoặc đọc file JSON tải lên.

Khi bạn bấm "Thêm" hoặc "Import", nó sẽ dọn dẹp dữ liệu rồi gọi ngược lên các hàm onAdd, onImport (chính là các hàm từ Context truyền xuống qua ManageQA) để ghi vào hệ thống.

4. Luồng Luyện tập & Phản xạ (Trang Practice)
Đường đi của dữ liệu: QAContext ➔ useRandomQA ➔ Practice ➔ FlashCard

Đây là luồng có logic phức tạp nhất nhưng đã được tách nhỏ rất gọn gàng:

utils/shuffle.js: Một hàm thuần túy (pure function). Đưa cho nó 1 mảng, nó xáo trộn ngẫu nhiên và trả về mảng mới.

hooks/useRandomQA.js: Là bộ não của phần luyện tập. Nó lấy toàn bộ qaList gốc, gọi hàm shuffle để xáo trộn, rồi nhét vào một hàng đợi (queue). Nó cung cấp ra ngoài: câu hỏi hiện tại (currentQA), số câu còn lại, và hàm chuyển câu tiếp theo (nextQA).

pages/Practice.jsx: Gọi cái não (useRandomQA) ở trên ra. Nó kiểm tra xem còn câu hỏi không, nếu hết thì báo "Hoàn thành", nếu còn thì ném currentQA xuống cho thẻ FlashCard hiển thị.

components/practice/FlashCard.jsx: Nhận đúng 1 câu hỏi duy nhất. Nó quản lý trạng thái lật thẻ (ẩn/hiện đáp án). Đồng thời, file này có cài đặt useEffect lắng nghe bàn phím: khi bấm phím Space, nó tự động lật thẻ hoặc gọi hàm chuyển câu mới.

5. Luồng Điều hướng & Khởi động (Router)
main.jsx: File chạy đầu tiên. Nó bọc toàn bộ ứng dụng bằng thẻ <QAProvider> (để bơm máu/dữ liệu đi khắp nơi) và <BrowserRouter> (để kích hoạt tính năng chuyển trang).

App.jsx: Khung xương của app. Nó chứa thanh Menu (Navbar) để điều hướng tĩnh và phần <main> chứa <Routes>. Khi bạn bấm menu, Router sẽ tráo đổi các trang (Home, ManageQA, Practice) vào phần <main> này mà không cần tải lại trình duyệt.

6. Giao diện tái sử dụng (UI Components)
Các file trong components/ui/ (Button.jsx, Input.jsx, Card.jsx) hoàn toàn "ngu ngốc" (Dumb components).

Chúng không biết gì về logic hay dữ liệu của app, chỉ nhận nội dung (children) và giao diện (Tailwind classes) để in ra màn hình. Việc này giúp bạn sửa CSS ở 1 chỗ (ví dụ đổi màu nút) thì toàn bộ web sẽ thay đổi theo.