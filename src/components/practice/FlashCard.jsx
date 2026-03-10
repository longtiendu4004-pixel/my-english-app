// import { useState, useEffect } from 'react';
// import Button from '../ui/Button';

// // Nhận thêm prop autoPlay
// export default function FlashCard({ qa, onNext, autoPlay }) {
//   const [showAnswer, setShowAnswer] = useState(false);

//   // Hàm phát âm thanh cốt lõi
//   const playAudio = (url) => {
//     if (url) {
//       const audio = new Audio(url);
//       audio.play().catch(error => {
//         console.log("Trình duyệt chặn auto-play, cần tương tác trước:", error);
//       });
//     }
//   };

//   // Reset trạng thái lật thẻ khi câu hỏi thay đổi
//   useEffect(() => {
//     setShowAnswer(false);
//   }, [qa]);

//   // AUTO-PLAY 1: Tự động đọc Target khi câu hỏi mới xuất hiện
//   useEffect(() => {
//     if (autoPlay && !showAnswer) {
//       playAudio(qa.targetAudio);
//     }
//   }, [qa, autoPlay]);

//   // AUTO-PLAY 2: Tự động đọc Question (Response) ngay khi vừa lật thẻ xong
//   useEffect(() => {
//     if (autoPlay && showAnswer) {
//       playAudio(qa.questionAudio);
//     }
//   }, [showAnswer, autoPlay]);

//   // Lắng nghe phím Space / Enter
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === 'Space' || e.code === 'Enter') {
//         e.preventDefault(); // Tránh bị cuộn trang
//         if (!showAnswer) setShowAnswer(true);
//         else onNext();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [showAnswer, onNext]);

//   return (
//     <div className="w-full flex flex-col items-center">
//       <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 text-center min-h-[350px] flex flex-col justify-center relative transition-all duration-500 ease-in-out">
//         <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-widest text-indigo-400 uppercase">
//           Target
//         </span>
        
//         {/* Khu vực Target có thêm nút loa */}
//         <div className="flex items-center justify-center gap-3 mt-4 mb-8">
//           <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
//             {qa.target}
//           </h3>
//           {qa.targetAudio && (
//             <button 
//               onClick={(e) => { e.stopPropagation(); playAudio(qa.targetAudio); }}
//               className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
//               title="Nghe phát âm"
//             >
//               🔊
//             </button>
//           )}
//         </div>
        
//         {showAnswer ? (
//           <div className="mt-4 pt-8 border-t-2 border-dashed border-slate-100 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
//             <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase block mb-3">
//               Response
//             </span>
            
//             {/* Khu vực Question/Response có thêm nút loa */}
//             <div className="flex items-center justify-center gap-3">
//               <h4 className="text-2xl md:text-3xl font-bold text-slate-600">
//                 {qa.question}
//               </h4>
//               {qa.questionAudio && (
//                 <button 
//                   onClick={(e) => { e.stopPropagation(); playAudio(qa.questionAudio); }}
//                   className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
//                   title="Nghe phát âm"
//                 >
//                   🔊
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="mt-4 px-8 py-4">
//             <Button variant="secondary" onClick={() => setShowAnswer(true)}>
//               Lật thẻ 
//             </Button>
//           </div>
//         )}
//       </div>
      
//       <div className={`mt-8 transition-all duration-300 w-full max-w-sm ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
//         <Button onClick={onNext} className="w-full py-4 text-lg">
//           Câu tiếp theo
//         </Button>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from 'react';
// import Button from '../ui/Button';

// export default function FlashCard({ qa, onNext, autoPlay }) {
//   const [showAnswer, setShowAnswer] = useState(false);

//   // 1. HÀM ĐỌC GIỌNG NÓI MỚI (Dùng thẳng engine của máy tính, KHÔNG CẦN LINK AUDIO)
//   const playAudio = (text) => {
//     if (!text) return;
    
//     // Xóa các câu đang đọc dở (nếu lật thẻ quá nhanh)
//     window.speechSynthesis.cancel(); 
    
//     // Gọi cô giáo tiếng Anh ảo ra đọc
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US'; // Chỉnh giọng chuẩn tiếng Anh
//     utterance.rate = 0.9;     // Chỉnh tốc độ đọc chậm lại một chút cho dễ nghe
    
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     setShowAnswer(false);
//   }, [qa]);

//   // 2. AUTO-PLAY: Truyền thẳng chữ (qa.target) vào hàm thay vì link
//   useEffect(() => {
//     if (autoPlay && !showAnswer) {
//       setTimeout(() => playAudio(qa.target), 100);
//     }
//   }, [qa, autoPlay]);

//   // 3. AUTO-PLAY: Truyền thẳng chữ (qa.question) vào hàm thay vì link
//   useEffect(() => {
//     if (autoPlay && showAnswer) {
//       setTimeout(() => playAudio(qa.question), 100);
//     }
//   }, [showAnswer, autoPlay]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === 'Space' || e.code === 'Enter') {
//         e.preventDefault();
//         if (!showAnswer) setShowAnswer(true);
//         else onNext();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [showAnswer, onNext]);

//   return (
//     <div className="w-full flex flex-col items-center">
//       <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 text-center min-h-[350px] flex flex-col justify-center relative transition-all duration-500 ease-in-out">
//         <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-widest text-indigo-400 uppercase">
//           Target
//         </span>
        
//         <div className="flex items-center justify-center gap-3 mt-4 mb-8">
//           <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
//             {qa.target}
//           </h3>
//           {/* Sửa lại nút bấm: Truyền qa.target thay vì qa.targetAudio */}
//           <button 
//             onClick={(e) => { e.stopPropagation(); playAudio(qa.target); }}
//             className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
//           >
//             🔊
//           </button>
//         </div>
        
//         {showAnswer ? (
//           <div className="mt-4 pt-8 border-t-2 border-dashed border-slate-100 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
//             <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase block mb-3">
//               Response
//             </span>
            
//             <div className="flex items-center justify-center gap-3">
//               <h4 className="text-2xl md:text-3xl font-bold text-slate-600">
//                 {qa.question}
//               </h4>
//               {/* Sửa lại nút bấm: Truyền qa.question thay vì qa.questionAudio */}
//               <button 
//                 onClick={(e) => { e.stopPropagation(); playAudio(qa.question); }}
//                 className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
//               >
//                 🔊
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-4 px-8 py-4">
//             <Button variant="secondary" onClick={() => setShowAnswer(true)}>
//               Lật thẻ 
//             </Button>
//           </div>
//         )}
//       </div>
      
//       <div className={`mt-8 transition-all duration-300 w-full max-w-sm ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
//         <Button onClick={onNext} className="w-full py-4 text-lg">
//           Câu tiếp theo
//         </Button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import Button from '../ui/Button';

export default function FlashCard({ qa, onNext, autoPlay }) {
  const [showAnswer, setShowAnswer] = useState(false);
  
  // State để theo dõi xem đang đọc Target hay Question để chạy thanh progress
  const [playingType, setPlayingType] = useState(null); 

  const playAudio = (text, type) => {
    if (!text) return;
    
    window.speechSynthesis.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.9;     
    
    // Bắt sự kiện khi bắt đầu đọc và kết thúc đọc để kích hoạt hiệu ứng thanh chạy
    utterance.onstart = () => setPlayingType(type);
    utterance.onend = () => setPlayingType(null);
    utterance.onerror = () => setPlayingType(null);
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setShowAnswer(false);
  }, [qa]);

  useEffect(() => {
    if (autoPlay && !showAnswer) {
      setTimeout(() => playAudio(qa.target, 'target'), 100);
    }
  }, [qa, autoPlay]);

  useEffect(() => {
    if (autoPlay && showAnswer) {
      setTimeout(() => playAudio(qa.question, 'question'), 100);
    }
  }, [showAnswer, autoPlay]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!showAnswer) setShowAnswer(true);
        else onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAnswer, onNext]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-14 text-center min-h-[350px] flex flex-col justify-center relative transition-all duration-500 ease-in-out">
        <span className="absolute top-8  left-1/2 -translate-x-1/2 text-[20px] font-black tracking-widest text-indigo-400 uppercase">
          Target
        </span>
        
        {/* --- KHU VỰC TARGET --- */}
        <div className="flex flex-col items-center justify-center mt-4 mb-8">
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight mb-6">
            {qa.target}
          </h3>
          
          {/* Thanh Player cho Target */}
          <div 
            className="flex items-center gap-3 w-full max-w-[240px] mx-auto p-1.5 bg-slate-50 border border-slate-200 rounded-full shadow-inner"
            onClick={(e) => e.stopPropagation()} // Ngăn lật thẻ khi click vào thanh player
          >
            <button 
              onClick={() => playAudio(qa.target, 'target')}
              className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 cursor-pointer rounded-full transition-colors shrink-0"
              title="Nghe phát âm"
            >
              {playingType === 'target' ? '🔊' : '▶️'}
            </button>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden mr-3">
              <div className={`h-full bg-indigo-500 rounded-full ${playingType === 'target' ? 'w-full transition-all duration-[2000ms] ease-out' : 'w-0'}`}></div>
            </div>
          </div>
        </div>
        
        {showAnswer ? (
          <div className="mt-4 pt-8 border-t-2 border-dashed border-slate-100 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
            <span className="text-[20px] font-black tracking-widest text-emerald-500 uppercase block mb-3">
              Response
            </span>
            
            {/* --- KHU VỰC QUESTION / RESPONSE --- */}
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-2xl md:text-3xl font-bold text-slate-600 mb-5">
                {qa.question}
              </h4>

              {/* Thanh Player cho Question */}
              <div 
                className="flex items-center gap-3 w-full max-w-[240px] mx-auto p-1.5 bg-slate-50 border border-slate-200 rounded-full shadow-inner"
                onClick={(e) => e.stopPropagation()} 
              >
                <button 
                  onClick={() => playAudio(qa.question, 'question')}
                  className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full cursor-pointer shrink-0"
                  title="Nghe phát âm"
                >
                  {playingType === 'question' ? '🔊' : '▶️'}
                </button>
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden mr-3">
                  <div className={`h-full bg-emerald-500 rounded-full ${playingType === 'question' ? 'w-full transition-all duration-[2000ms] ease-out' : 'w-0'}`}></div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="mt-4 px-8 py-4">
            <Button variant="secondary" onClick={() => setShowAnswer(true)}>
              Lật thẻ 
            </Button>
          </div>
        )}
      </div>
      
      <div className={`mt-8 transition-all duration-300 w-full max-w-sm ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <Button onClick={onNext} className="w-full py-4 text-lg">
          Câu tiếp theo
        </Button>
      </div>
    </div>
  );
}