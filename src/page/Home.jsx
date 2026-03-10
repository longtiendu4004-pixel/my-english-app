import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { QAContext } from '../context/QAContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Home() {
  const { qaList } = useContext(QAContext);

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-5xl font-black text-slate-800 tracking-tight">
          Luyện phản xạ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Tiếng Anh</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium">Học thông minh hơn bằng cách ghi nhớ ngẫu nhiên không lặp lại.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center text-center space-y-4 hover:border-indigo-200 transition-colors group">
          <div className="w-20 h-20 bg-indigo-50  text-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-black">
            {qaList.length}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Kho câu hỏi</h3>
            <p className="text-slate-500 text-sm mt-2">Thêm, sửa, xóa các mẫu câu mục tiêu của bạn.</p>
          </div>
          <Link to="/manage" className="w-full mt-auto pt-4">
            <Button className="w-full" variant="secondary">Quản lý ngay</Button>
          </Link>
        </Card>

        <Card className="flex flex-col items-center text-center space-y-4 hover:border-emerald-200 transition-colors group">
          <div className="w-20 h-20 bg-emerald-50  text-emerald-600 rounded-3xl flex items-center justify-center text-3xl font-black">
            ⚡
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Luyện tập</h3>
            <p className="text-slate-500 text-sm mt-2">Bắt đầu vòng lặp ngẫu nhiên để luyện phản xạ.</p>
          </div>
          <Link to="/practice" className="w-full mt-auto pt-4">
            <Button variant="success" className="w-full">Bắt đầu học</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}