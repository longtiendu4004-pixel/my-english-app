import { createContext, useState, useEffect } from 'react';
import defaultData from '../utils/defaultQA.json';
export const QAContext = createContext();

export const QAProvider = ({ children }) => {
  const [qaList, setQaList] = useState(() => {
    const saved = localStorage.getItem('english_qa_list');
    if (saved && JSON.parse(saved).length > 0) {
       return JSON.parse(saved);
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('english_qa_list', JSON.stringify(qaList));
  }, [qaList]);

  // SỬA: Thêm tham số targetAudio và questionAudio (để mặc định là rỗng nếu không nhập)
  const addQA = (target, question, targetAudio = "", questionAudio = "") => {
    setQaList([
      { id: Date.now(), target, question, targetAudio, questionAudio }, 
      ...qaList
    ]);
  };

  // HÀM MỚI (Bonus): Hàm này dùng để cập nhật/sửa một cặp Q-A đã có
  const updateQA = (id, updatedData) => {
    setQaList(qaList.map(qa => 
      qa.id === id ? { ...qa, ...updatedData } : qa
    ));
  };

  const deleteQA = (id) => {
    setQaList(qaList.filter(qa => qa.id !== id));
  };

  const deleteAllQA = () => {
    setQaList([]);
  };

  // SỬA: Cập nhật hàm import để hứng thêm dữ liệu âm thanh từ file JSON
  const importQAList = (jsonArray) => {
    const newItems = jsonArray.map((item, index) => ({
      id: Date.now() + index, // Cộng thêm index để đảm bảo các id không bị trùng nhau
      target: item.target,
      question: item.question,
      targetAudio: item.targetAudio || "",   // Lấy link nếu có, không có thì để rỗng
      questionAudio: item.questionAudio || "" // Lấy link nếu có, không có thì để rỗng
    }));
    
    // Nối dữ liệu mới lên đầu danh sách cũ
    setQaList(prevList => [...newItems, ...prevList]);
  };

  return (
    // Nhớ truyền thêm updateQA vào đây nhé
    <QAContext.Provider value={{ qaList, addQA, deleteQA, deleteAllQA, importQAList, updateQA }}>
      {children}
    </QAContext.Provider>
  );
};