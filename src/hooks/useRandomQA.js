import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../utils/shuffle';

export const useRandomQA = (qaList) => {
  const [queue, setQueue] = useState([]);
  const [currentQA, setCurrentQA] = useState(null);

  const startPractice = useCallback(() => {
    if (qaList.length === 0) return;
    const shuffled = shuffleArray(qaList);
    setQueue(shuffled.slice(1));
    setCurrentQA(shuffled[0]);
  }, [qaList]);

  useEffect(() => {
    // Tự động bắt đầu nếu có dữ liệu mà chưa có câu hỏi hiện tại
    if (qaList.length > 0 && !currentQA) {
      startPractice();
    }
  }, [qaList, currentQA, startPractice]);

  const nextQA = () => {
    if (queue.length === 0) {
      setCurrentQA(null);
      return;
    }
    setCurrentQA(queue[0]);
    setQueue(queue.slice(1));
  };

  return {
    currentQA,
    remainingCount: queue.length,
    nextQA,
    resetPractice: startPractice,
    isFinished: qaList.length > 0 && !currentQA
  };
};