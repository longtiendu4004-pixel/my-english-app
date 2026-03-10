import { useContext, useState } from 'react';
import { QAContext } from '../context/QAContext';
import Card from '../components/ui/Card';
import QAForm from '../components/form/QAForm';
import Button from '../components/ui/Button';

export default function ManageQA() {
  // 1. Lấy thêm updateQA từ Context ra để dùng
  const { qaList, addQA, deleteQA, updateQA, importQAList, deleteAllQA } = useContext(QAContext);
  
  // 2. State quản lý việc Sửa (Edit)
  const [editingId, setEditingId] = useState(null); // Lưu ID của câu đang được sửa
  const [editForm, setEditForm] = useState({ 
    target: '', question: '', targetAudio: '', questionAudio: '' 
  });

  const handleDeleteAll = () => {
    if (window.confirm("🚨 BẠN CÓ CHẮC CHẮN MUỐN XÓA SẠCH DỮ LIỆU KHÔNG ?")) {
      deleteAllQA();
    }
  };

  // Hàm kích hoạt chế độ sửa
  const handleStartEdit = (qa) => {
    setEditingId(qa.id);
    setEditForm({
      target: qa.target,
      question: qa.question,
      targetAudio: qa.targetAudio || '',
      questionAudio: qa.questionAudio || ''
    });
  };

  // Hàm lưu dữ liệu sau khi sửa
  const handleSaveEdit = () => {
    if (!editForm.target.trim() || !editForm.question.trim()) {
      alert("Câu hỏi và Câu trả lời không được để trống!");
      return;
    }
    updateQA(editingId, editForm);
    setEditingId(null); // Tắt chế độ sửa
  };

  // Hàm hủy sửa
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
      <Card>
        <h2 className="text-2xl font-extrabold mb-6 text-slate-800">Thêm mẫu câu mới</h2>
        <QAForm onAdd={addQA} onImport={importQAList} />
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Danh sách đã lưu ({qaList.length})
          </h2>

          {qaList.length > 0 && (
            <Button
              variant="danger"
              onClick={handleDeleteAll}
              className="px-4 py-2 text-sm shadow-none"
            >
              🗑️ Xóa tất cả
            </Button>
          )}
        </div>

        {qaList.length === 0 ? (
          <p className="text-slate-400 text-center py-12 font-medium border-2 border-dashed border-slate-100 rounded-3xl">
            Chưa có mẫu câu nào. Hãy thêm ở trên nhé!
          </p>
        ) : (
          <ul className="space-y-4">
            {qaList.map((qa) => (
              <li key={qa.id} className="flex flex-col md:flex-row md:items-start justify-between p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all gap-4 group">
                
                {/* --- KHU VỰC HIỂN THỊ --- */}
                {editingId === qa.id ? (
                  /* GIAO DIỆN KHI ĐANG SỬA */
                  <div className="flex-1 space-y-3 w-full">
                    <input 
                      className="w-full p-2 border rounded bg-white text-slate-800 font-bold" 
                      value={editForm.target} 
                      onChange={e => setEditForm({...editForm, target: e.target.value})} 
                      placeholder="Target"
                    />
                    <input 
                      className="w-full p-2 border rounded bg-white text-slate-500 text-sm" 
                      value={editForm.targetAudio} 
                      onChange={e => setEditForm({...editForm, targetAudio: e.target.value})} 
                      placeholder="Target Audio URL (Tùy chọn)"
                    />
                    <input 
                      className="w-full p-2 border rounded bg-white text-slate-600 mt-2" 
                      value={editForm.question} 
                      onChange={e => setEditForm({...editForm, question: e.target.value})} 
                      placeholder="Question"
                    />
                    <input 
                      className="w-full p-2 border rounded bg-white text-slate-500 text-sm" 
                      value={editForm.questionAudio} 
                      onChange={e => setEditForm({...editForm, questionAudio: e.target.value})} 
                      placeholder="Question Audio URL (Tùy chọn)"
                    />
                    
                    <div className="flex gap-2 mt-3">
                      <Button onClick={handleSaveEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Lưu</Button>
                      <Button variant="secondary" onClick={handleCancelEdit} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-slate-700">Hủy</Button>
                    </div>
                  </div>
                ) : (
                  /* GIAO DIỆN XEM BÌNH THƯỜNG */
                  <div className="space-y-1.5 flex-1">
                    <p className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {qa.target}
                      {qa.targetAudio && <span title="Có âm thanh" className="text-sm">🎵</span>}
                    </p>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      ↳ {qa.question}
                      {qa.questionAudio && <span title="Có âm thanh" className="text-sm">🎵</span>}
                    </p>
                  </div>
                )}

                {/* --- CÁC NÚT THAO TÁC (Chỉ hiện khi không ở chế độ sửa) --- */}
                {editingId !== qa.id && (
                  <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 shrink-0 transition-opacity mt-2 md:mt-0">
                    <Button
                      variant="secondary"
                      onClick={() => handleStartEdit(qa)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300"
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteQA(qa.id)}
                      className="px-4 py-2"
                    >
                      Xóa
                    </Button>
                  </div>
                )}

              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}