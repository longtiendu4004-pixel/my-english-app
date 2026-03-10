@echo off
:: Lệnh này giúp di chuyển đến đúng thư mục hiện tại
cd /d "%~dp0" 

:: Mở sẵn trình duyệt web (Nếu bạn dùng Vite thì đổi số 3000 thành 5173 nhé)
start http://localhost:5173/

:: Chạy lệnh khởi động React (Nếu dùng Vite thì đổi thành: npm run dev)
npm run dev