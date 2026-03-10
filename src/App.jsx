import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './page/Home.jsx';
import ManageQA from './page/ManageQA.jsx';
import Practice from './page/Practice.jsx';



function App() {


  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;

    // Thêm hover:scale-105 vào class chung để nút nào hover vào cũng phóng to lên 5%
    return `px-5 py-2.5 rounded-xl font-bold transition-all duration-200 inline-block hover:scale-105 ${isActive
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' // Nút đang chọn: sáng màu hơn chút khi hover
        : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800' // Nút chưa chọn: nền xám đậm hơn chút, chữ đen hơn
      }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 hover:scale-105 transition-transform">
              E
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Reflex</h1>
          </Link>

          <div className="flex gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100 hover:bg-slate-900">
            <Link to="/" className={getLinkClass('/')}>Trang chủ</Link>
            <Link to="/manage" className={getLinkClass('/manage')}>Quản lý</Link>
            <Link to="/practice" className={getLinkClass('/practice')}>Luyện tập</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 md:py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage" element={<ManageQA />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;