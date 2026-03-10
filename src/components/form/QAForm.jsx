import { useState, useRef } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function QAForm({ onAdd, onImport }) {
  const [target, setTarget] = useState('');
  const [question, setQuestion] = useState('');
  
  // MỚI: Thêm state để lưu link âm thanh
  const [targetAudio, setTargetAudio] = useState('');
  const [questionAudio, setQuestionAudio] = useState('');
  
  // Dùng useRef để tham chiếu đến thẻ input file bị ẩn
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!target.trim() || !question.trim()) return;
    
    // MỚI: Truyền thêm targetAudio và questionAudio vào hàm onAdd
    onAdd(target, question, targetAudio, questionAudio);
    
    // MỚI: Reset toàn bộ form sau khi thêm thành công
    setTarget('');
    setQuestion('');
    setTargetAudio('');
    setQuestionAudio('');
  };

  // Hàm xử lý khi người dùng chọn file JSON tải lên
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // Chuyển đổi nội dung file text thành object JavaScript
        const jsonData = JSON.parse(event.target.result);
        
        // Kiểm tra xem dữ liệu có phải là một mảng không
        if (Array.isArray(jsonData)) {
          onImport(jsonData); // Gọi hàm được truyền từ ManageQA xuống
          alert(`Đã import thành công ${jsonData.length} câu!`);
        } else {
          alert('Lỗi: File JSON phải là một mảng các object chứa target và question.');
        }
      } catch (err) {
        alert('Lỗi: Cấu trúc file JSON không hợp lệ (không đúng chuẩn JSON).');
      }
      
      // Reset input để nếu bạn chọn lại chính file đó lần nữa thì nó vẫn nhận
      e.target.value = null;
    };
    
    // Đọc file dưới dạng văn bản (text)
    reader.readAsText(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* KHỐI CÂU HỎI */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
        <Input
          label="Question (Câu hỏi phản xạ)"
          placeholder="VD: How long does it take you to study English?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Input
          label="Question Audio URL (Link âm thanh - Tùy chọn)"
          placeholder="VD: https://translate.google.com/..."
          value={questionAudio}
          onChange={(e) => setQuestionAudio(e.target.value)}
        />
      </div>

      {/* KHỐI ĐÁP ÁN */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
        <Input
          label="Target (Câu mục tiêu)"
          placeholder="VD: It takes me about 2 hours to study English"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <Input
          label="Target Audio URL (Link âm thanh - Tùy chọn)"
          placeholder="VD: https://translate.google.com/..."
          value={targetAudio}
          onChange={(e) => setTargetAudio(e.target.value)}
        />
      </div>
      
      {/* Sắp xếp 2 nút nằm ngang nhau trên màn hình lớn, và dọc trên mobile */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button type="submit" className="flex-1">
          + Thêm vào danh sách
        </Button>
        
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => fileInputRef.current.click()}
        >
          📂 Import JSON
        </Button>
        
        {/* Thẻ input dùng để tải file bị ẩn đi cho đẹp giao diện */}
        <input 
          type="file" 
          accept=".json" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
        />
      </div>
    </form>
  );
}