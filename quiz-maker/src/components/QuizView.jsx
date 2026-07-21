import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const QuizView = ({ quizData, onBack }) => {
  const { subject, questions } = quizData;
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const topRef = useRef(null);

  const handleSelectOption = (questionId, option) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div ref={topRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
        <div className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-500/20">
          Môn học: {subject}
        </div>
      </div>

      {/* Result Card if submitted */}
      {isSubmitted && (
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8 mb-8 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Hoàn thành bài thi!</h2>
          <p className="text-slate-300 text-lg">
            Bạn đã trả lời đúng <span className="text-white font-bold">{calculateScore()}</span> / {questions.length} câu hỏi.
          </p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, index) => {
          const selectedAnswer = answers[q.id];
          const isCorrect = selectedAnswer === q.answer;
          
          return (
            <div key={q.id} className="bg-slate-800/40 border border-white/5 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4">
                <span className="text-slate-400 mr-2">Câu {index + 1}:</span>
                {q.question}
              </h3>
              
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswer === opt;
                  const isTrueAnswer = isSubmitted && opt === q.answer;
                  const isWrongAnswer = isSubmitted && isSelected && !isCorrect;

                  let optionClass = "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ";
                  
                  if (isSubmitted) {
                    if (isTrueAnswer) {
                      optionClass += "bg-green-500/10 border-green-500/50 text-green-300 cursor-default";
                    } else if (isWrongAnswer) {
                      optionClass += "bg-red-500/10 border-red-500/50 text-red-300 cursor-default";
                    } else {
                      optionClass += "bg-slate-800/30 border-white/5 text-slate-500 cursor-default opacity-50";
                    }
                  } else {
                    if (isSelected) {
                      optionClass += "bg-blue-500/20 border-blue-500 text-blue-200";
                    } else {
                      optionClass += "bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/50 hover:border-white/20";
                    }
                  }

                  return (
                    <div 
                      key={i} 
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={optionClass}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected 
                          ? (isSubmitted ? (isCorrect ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500') : 'border-blue-500 border-[6px]') 
                          : (isTrueAnswer ? 'border-green-500 bg-green-500' : 'border-slate-500')
                      }`} />
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted && questions.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
          >
            {Object.keys(answers).length < questions.length 
              ? `Đã chọn ${Object.keys(answers).length}/${questions.length}` 
              : 'Nộp bài ngay'
            }
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;
