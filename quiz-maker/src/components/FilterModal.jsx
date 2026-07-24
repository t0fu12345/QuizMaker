import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { motion } from 'motion/react';

const SUBJECTS = [
  { id: 'c', name: 'C' },
  { id: 'html5', name: 'HTML5' },
  { id: 'reactjs', name: 'ReactJS' },
  { id: 'sql_server', name: 'SQL Server' },
  { id: 'uiux', name: 'UI/UX' },
  { id: 'aiessen', name: 'AI Essentials' },
  { id: 'github', name: 'Github' }
];

const QUESTION_COUNTS = [5, 10, 15, 20];

const FilterModal = ({ onClose, onStart }) => {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].id);
  const [questionCount, setQuestionCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ subject: selectedSubject, count: Number(questionCount) });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-lg dark:shadow-2xl relative z-10 transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 transition-colors">
          <h2 id="modal-title" className="text-xl font-bold text-slate-900 dark:text-zinc-50 transition-colors">Cấu hình bài tập</h2>
          <button 
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-50 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Môn học */}
          <div className="space-y-2">
            <label htmlFor="subject-select" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 transition-colors">
              Chọn môn học
            </label>
            <div className="relative">
              <select 
                id="subject-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-zinc-50 text-base rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500 focus:border-blue-500 dark:focus:border-amber-500 transition-all cursor-pointer"
              >
                {SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500 transition-colors">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Số lượng */}
          <div className="space-y-2" role="group" aria-labelledby="question-count-label">
            <label id="question-count-label" className="block text-sm font-medium text-slate-700 dark:text-zinc-300 transition-colors">
              Số lượng câu hỏi
            </label>
            <div className="grid grid-cols-4 gap-3">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  aria-pressed={questionCount === count}
                  className={`py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 ${
                    questionCount === count
                      ? 'bg-blue-600 dark:bg-zinc-50 text-white dark:text-zinc-950 shadow-sm border border-blue-600 dark:border-zinc-50'
                      : 'bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Footer / Submit */}
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-amber-500 hover:bg-blue-700 dark:hover:bg-amber-400 text-white dark:text-zinc-950 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-200 active:scale-[0.98] shadow-md dark:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
            >
              <Play size={18} strokeWidth={2.5} />
              Bắt đầu làm bài
            </button>
          </div>
        </form>

      </motion.div>
    </div>
  );
};

export default FilterModal;
