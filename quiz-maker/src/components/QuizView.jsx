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

  const answeredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div ref={topRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1"
        >
          <ArrowLeft size={20} />
          <span>Quay lại</span>
        </button>
        <div className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-500/20">
          Môn học: {subject}
        </div>
      </div>

      {/* Progress Bar */}
      {!isSubmitted && questions.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2 font-medium">
            <span>Tiến độ làm bài</span>
            <span>{answeredCount} / {questions.length}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Result Card if submitted */}
      {isSubmitted && (
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8 mb-8 text-center shadow-xl animate-in zoom-in-95 duration-500">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4 ring-8 ring-green-500/10">
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
              
              <div className="space-y-3" role="group" aria-label={`Tùy chọn cho câu ${index + 1}`}>
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswer === opt;
                  const isTrueAnswer = isSubmitted && opt === q.answer;
                  const isWrongAnswer = isSubmitted && isSelected && !isCorrect;

                  let optionClass = "w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ";
                  
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
                      optionClass += "bg-blue-500/20 border-blue-500 text-blue-200 active:scale-[0.99]";
                    } else {
                      optionClass += "bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/50 hover:border-white/20 active:scale-[0.99] active:bg-slate-700";
                    }
                  }

                  return (
                    <button 
                      key={i} 
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={optionClass}
                      aria-pressed={isSelected}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isSelected 
                          ? (isSubmitted ? (isCorrect ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500') : 'border-blue-500 border-[6px]') 
                          : (isTrueAnswer ? 'border-green-500 bg-green-500' : 'border-slate-500')
                      }`} />
                      <span className="leading-relaxed">{opt}</span>
                    </button>
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
            disabled={answeredCount < questions.length}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:active:scale-100 shadow-lg shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            {answeredCount < questions.length 
              ? 'Hoàn thành tất cả để nộp bài' 
              : 'Nộp bài ngay'
            }
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;
