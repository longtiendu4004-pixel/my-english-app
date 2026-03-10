import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { QAContext } from '../context/QAContext';
import { useRandomQA } from '../hooks/useRandomQA';
import FlashCard from '../components/practice/FlashCard';
import Button from '../components/ui/Button';

export default function Practice() {
  const { qaList } = useContext(QAContext);
  const { currentQA, remainingCount, nextQA, resetPractice, isFinished } = useRandomQA(qaList);
  
  // MỚI: State quản lý bật/tắt tự động đọc âm thanh
  const [autoPlay, setAutoPlay] = useState(false);

  if (qaList.length === 0) {
    return (
      <div className="text-center py-20 animate-[fadeIn_0.3s_ease-out]">
        <h2 className="text-2xl font-bold text-slate-700">Thư viện trống!</h2>
        <p className="text-slate-500 mt-2 mb-6">Bạn cần thêm mẫu câu trước khi luyện tập.</p>
        <Link to="/manage">
          <Button>Đến trang Quản lý</Button>
        </Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100 animate-[fadeIn_0.4s_ease-out]">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-4xl font-black text-emerald-500 mb-4">Tuyệt vời!</h2>
        <p className="text-slate-500 font-medium mb-8 text-lg">Bạn đã hoàn thành lượt phản xạ này.</p>
        <Button onClick={resetPractice} className="mx-auto px-8 py-4 text-lg">
          ↻ Bắt đầu vòng mới
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center animate-[fadeIn_0.4s_ease-out]">
      
      {/* MỚI: Cấu trúc lại Header để chứa Số câu còn lại và Nút bật Auto-play */}
      <div className="w-full flex justify-between items-center mb-8 px-2 md:px-0">
        <div className="font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-full text-sm">
          Còn lại: {remainingCount + 1} câu
        </div>

        {/* Nút Toggle Switch cho Auto-play */}
        {/* <label className="flex items-center cursor-pointer gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
          <span className="text-sm font-bold text-slate-600">🎧 Auto-play</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoPlay}
              onChange={() => setAutoPlay(!autoPlay)}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </div>
        </label> */}
      </div>
      
      {/* Truyền thêm state autoPlay xuống FlashCard */}
      {currentQA && (
        <FlashCard 
          qa={currentQA} 
          onNext={nextQA} 
          autoPlay={autoPlay} 
        />
      )}
    </div>
  );
}