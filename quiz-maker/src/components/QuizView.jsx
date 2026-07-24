import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
      if (answers[q.id] === q.answer) score++;
    });
    return score;
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[60] bg-zinc-950 overflow-y-auto"
    >
      <div ref={topRef} className="max-w-3xl mx-auto px-6 py-10 md:py-16 pb-32">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg px-2 py-1"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Quay lại trang chủ</span>
          </button>
          <div className="bg-zinc-800 text-zinc-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/10 uppercase tracking-wider">
            {subject}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <AnimatePresence>
          {!isSubmitted && questions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10"
            >
              <div className="flex justify-between text-sm text-zinc-400 mb-3 font-medium">
                <span>Tiến độ</span>
                <span>{answeredCount} / {questions.length}</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-zinc-900 border border-white/10 rounded-[24px] p-8 mb-10 text-center shadow-2xl flex flex-col items-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 border border-emerald-500/20">
                <CheckCircle2 size={40} strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-zinc-50 mb-3 tracking-tight">Hoàn thành bài thi!</h2>
              <p className="text-zinc-400 text-lg">
                Bạn đã trả lời đúng <span className="text-zinc-50 font-bold text-2xl">{calculateScore()}</span> / {questions.length} câu hỏi.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Questions List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {questions.map((q, index) => {
            const selectedAnswer = answers[q.id];
            const isCorrect = selectedAnswer === q.answer;
            
            return (
              <motion.div 
                key={q.id} 
                variants={itemVariants}
                className="bg-zinc-900/50 border border-white/5 p-6 md:p-8 rounded-[24px]"
              >
                <h3 className="text-lg font-medium text-zinc-50 mb-6 leading-relaxed">
                  <span className="text-amber-500 font-bold mr-3 text-xl">{index + 1}.</span>
                  {q.question}
                </h3>
                
                <div className="space-y-3" role="group" aria-label={`Tùy chọn cho câu ${index + 1}`}>
                  {q.options.map((opt, i) => {
                    const isSelected = selectedAnswer === opt;
                    const isTrueAnswer = isSubmitted && opt === q.answer;
                    const isWrongAnswer = isSubmitted && isSelected && !isCorrect;

                    let optionClass = "w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ";
                    
                    if (isSubmitted) {
                      if (isTrueAnswer) {
                        optionClass += "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 cursor-default";
                      } else if (isWrongAnswer) {
                        optionClass += "bg-rose-500/10 border-rose-500/30 text-rose-400 cursor-default";
                      } else {
                        optionClass += "bg-zinc-900/30 border-white/5 text-zinc-500 cursor-default opacity-50";
                      }
                    } else {
                      if (isSelected) {
                        optionClass += "bg-zinc-800 border-amber-500 text-zinc-50 shadow-md";
                      } else {
                        optionClass += "bg-zinc-950 border-white/5 text-zinc-300 hover:bg-zinc-900 hover:border-white/10 active:scale-[0.99]";
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
                        <div className="shrink-0 mt-0.5">
                          {isSubmitted ? (
                            isTrueAnswer ? (
                              <div className="w-6 h-6 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-sm">
                                <Check size={14} strokeWidth={3} />
                              </div>
                            ) : isWrongAnswer ? (
                              <div className="w-6 h-6 rounded-full bg-rose-500 text-zinc-950 flex items-center justify-center shadow-sm">
                                <XCircle size={16} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-zinc-600 opacity-50" />
                            )
                          ) : (
                            <div className={`w-6 h-6 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
                              isSelected 
                                ? 'border-amber-500' 
                                : 'border-zinc-600'
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                            </div>
                          )}
                        </div>
                        <span className="leading-relaxed font-medium mt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Submit Button */}
        {!isSubmitted && questions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex justify-end"
          >
            <button 
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-500 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {answeredCount < questions.length 
                ? 'Hoàn thành tất cả để nộp bài' 
                : 'Nộp bài ngay'
              }
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default QuizView;

