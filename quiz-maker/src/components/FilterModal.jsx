import React, { useState } from 'react';
import { X, Play } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">Cấu hình bài tập</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Môn học */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Chọn môn học
            </label>
            <div className="relative">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-800/50 border border-white/10 text-white text-base rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              >
                {SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id} className="bg-slate-800">
                    {sub.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Số lượng */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Số lượng câu hỏi
            </label>
            <div className="grid grid-cols-4 gap-3">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`py-2 rounded-xl text-sm font-medium transition-all ${
                    questionCount === count
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500'
                      : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:bg-slate-800 hover:text-slate-200'
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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-medium text-base transition-all shadow-lg shadow-blue-500/25"
            >
              <Play size={18} fill="currentColor" />
              Bắt đầu làm bài
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default FilterModal;
