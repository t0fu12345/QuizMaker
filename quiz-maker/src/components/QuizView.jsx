import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Check, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { m, AnimatePresence } from 'motion/react';

const QuizView = ({ quizData, onBack }) => {
  const { subject, questions } = quizData;
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeSpent, setTimeSpent] = useState({});
  const [startTime, setStartTime] = useState(Date.now());
  
  const [scoreResult, setScoreResult] = useState(null);
  const [aiAdvice, setAiAdvice] = useState(null);
  const topRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Helper to record time
  const recordTimeForCurrentQuestion = () => {
    if (!currentQuestion) return;
    const now = Date.now();
    const elapsedSecs = Math.round((now - startTime) / 1000);
    setTimeSpent(prev => ({
      ...prev,
      [currentQuestion.id]: (prev[currentQuestion.id] || 0) + elapsedSecs
    }));
    setStartTime(now);
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      recordTimeForCurrentQuestion();
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 0) {
      recordTimeForCurrentQuestion();
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSelectOption = (questionId, option) => {
    if (isSubmitted || isSubmitting) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    return score;
  };

  const handleSubmit = async () => {
    recordTimeForCurrentQuestion();
    setIsSubmitting(true);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const userId = localStorage.getItem('userId') || 'guest_unknown';
    const finalTimeSpent = { ...timeSpent };
    
    // Add time for the very last question interaction
    const currentElapsed = Math.round((Date.now() - startTime) / 1000);
    finalTimeSpent[currentQuestion.id] = (finalTimeSpent[currentQuestion.id] || 0) + currentElapsed;

    const answersData = questions.map(q => ({
      question_id: q.id,
      selected: answers[q.id] || null,
      time_spent: finalTimeSpent[q.id] || 0
    }));

    const payload = {
      userId,
      subjectId: subject,
      answers: answersData
    };

    try {
      const res = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      let finalScore = 0;
      if (res.ok) {
        const result = await res.json();
        finalScore = result.score;
      } else {
        finalScore = calculateScore();
      }
      setScoreResult(finalScore);

      const adviceRes = await fetch(`http://localhost:3001/api/advice?userId=${userId}`);
      if (adviceRes.ok) {
        const adviceResult = await adviceRes.json();
        setAiAdvice(adviceResult.advice || adviceResult.message || "Bạn làm rất tốt, tiếp tục phát huy nhé!");
      } else {
        throw new Error('Advice API failed');
      }

    } catch (err) {
      console.error("API call failed, using mock data.", err);
      // Mock data when server is not running (2s delay)
      await new Promise(r => setTimeout(r, 2000));
      setScoreResult(calculateScore());
      setAiAdvice("AI thấy rằng bạn cần ôn tập thêm về các khái niệm cơ bản. Hãy xem lại bài giảng để củng cố kiến thức nhé!");
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // Render Full Screen Loading for AI analysis
  if (isSubmitting) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[24px] shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-slate-200 dark:border-white/10">
          <Loader2 className="w-12 h-12 text-blue-500 dark:text-amber-500 animate-spin mb-6" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-50 mb-3 tracking-tight">AI đang phân tích...</h3>
          <p className="text-slate-500 dark:text-zinc-400 text-center text-sm leading-relaxed">
            Vui lòng chờ trong giây lát để hệ thống đánh giá bài làm và đưa ra lộ trình học phù hợp nhất cho bạn.
          </p>
        </div>
      </div>
    );
  }

  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[60] bg-slate-50 dark:bg-zinc-950 overflow-y-auto transition-colors"
    >
      <div ref={topRef} className="max-w-3xl mx-auto px-6 py-10 md:py-16 pb-32">
        {/* Header */}
        <m.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 rounded-lg px-2 py-1"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Quay lại trang chủ</span>
          </button>
          <div className="bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-slate-300 dark:border-white/10 uppercase tracking-wider transition-colors">
            {subject}
          </div>
        </m.div>

        {/* Progress Bar */}
        <AnimatePresence>
          {!isSubmitted && questions.length > 0 && (
            <m.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-10"
            >
              <div className="flex justify-between text-sm text-slate-500 dark:text-zinc-400 mb-3 font-medium transition-colors">
                <span>Tiến độ ({answeredCount}/{questions.length})</span>
                <span>Câu {currentQuestionIndex + 1} / {questions.length}</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden transition-colors">
                <m.div 
                  className="h-full bg-blue-500 dark:bg-amber-500 rounded-full transition-colors"
                  style={{ transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progressPercent / 100 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        <AnimatePresence>
          {isSubmitted && (
            <m.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[24px] p-8 md:p-12 mb-10 text-center shadow-sm dark:shadow-2xl flex flex-col items-center transition-colors"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mb-6 border border-emerald-500/20">
                <CheckCircle2 size={40} strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 mb-3 tracking-tight transition-colors">Hoàn thành bài thi!</h2>
              <p className="text-slate-600 dark:text-zinc-400 text-lg transition-colors mb-8">
                Bạn đã trả lời đúng <span className="text-slate-900 dark:text-zinc-50 font-bold text-3xl mx-1 transition-colors">{scoreResult !== null ? scoreResult : calculateScore()}</span> / {questions.length} câu hỏi.
              </p>
              
              {aiAdvice && (
                <m.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full bg-blue-50/50 dark:bg-amber-500/10 border border-blue-100 dark:border-amber-500/20 rounded-2xl p-6 md:p-8 text-left mb-10 shadow-sm"
                >
                  <h4 className="font-bold text-blue-900 dark:text-amber-400 mb-4 flex items-center gap-2 text-lg">
                    <span className="text-xl">✨</span> Phân tích từ AI
                  </h4>
                  <p className="text-blue-900/80 dark:text-amber-200/90 leading-relaxed text-[15px] md:text-base">
                    {aiAdvice}
                  </p>
                </m.div>
              )}

              <button 
                onClick={onBack}
                className="bg-slate-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-8 py-4 rounded-xl font-bold transition hover:opacity-90 active:scale-[0.98] w-full md:w-auto min-w-[200px]"
              >
                Làm bài khác
              </button>
            </m.div>
          )}
        </AnimatePresence>

        {/* Current Question Carousel View */}
        {!isSubmitted && currentQuestion && (
          <m.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-[24px] shadow-sm dark:shadow-none transition-colors min-h-[300px]">
              <h3 className="text-lg md:text-xl font-medium text-slate-900 dark:text-zinc-50 mb-8 leading-relaxed transition-colors">
                <span className="text-blue-500 dark:text-amber-500 font-bold mr-3 text-2xl transition-colors">{currentQuestionIndex + 1}.</span>
                {currentQuestion.question}
              </h3>
              
              <div className="space-y-3" role="group">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt;
                  let optionClass = "w-full text-left flex items-start gap-4 p-4 md:p-5 rounded-xl border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ";
                  
                  if (isSelected) {
                    optionClass += "bg-blue-50 dark:bg-zinc-800 border-blue-500 dark:border-amber-500 text-slate-900 dark:text-zinc-50 shadow-sm md:shadow-md";
                  } else {
                    optionClass += "bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:border-slate-300 dark:hover:border-white/10 active:scale-[0.99]";
                  }

                  return (
                    <button 
                      key={opt} 
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.id, opt)}
                      className={optionClass}
                      aria-pressed={isSelected}
                    >
                      <div className="shrink-0 mt-0.5">
                        <div className={`w-6 h-6 rounded-full border-2 transition-colors duration-200 flex items-center justify-center ${
                          isSelected 
                            ? 'border-blue-500 dark:border-amber-500' 
                            : 'border-slate-300 dark:border-zinc-600'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-amber-500 transition-colors" />}
                        </div>
                      </div>
                      <span className="leading-relaxed font-medium mt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Carousel Navigation / Submit */}
            <div className="flex items-center justify-between mt-8 gap-4">
              <button
                onClick={goToPrev}
                disabled={currentQuestionIndex === 0}
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-3.5 rounded-xl font-medium text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition bg-slate-100 dark:bg-zinc-900 w-1/3 md:w-auto"
              >
                <ChevronLeft size={20} className="hidden md:block" />
                <span>Trước</span>
              </button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={goToNext}
                  className="flex items-center justify-center gap-2 px-4 md:px-8 py-3.5 rounded-xl font-medium text-white dark:text-zinc-950 bg-slate-900 dark:bg-zinc-50 hover:opacity-90 transition active:scale-[0.98] flex-1 md:flex-none shadow-sm"
                >
                  <span>Tiếp tục</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={answeredCount < questions.length}
                  className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-amber-500 hover:bg-blue-700 dark:hover:bg-amber-400 text-white dark:text-zinc-950 px-4 md:px-8 py-3.5 rounded-xl font-bold transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] flex-1 md:flex-none shadow-md"
                >
                  <CheckCircle2 size={20} className="hidden md:block" />
                  <span>Nộp bài ngay</span>
                </button>
              )}
            </div>
          </m.div>
        )}
      </div>
    </m.div>
  );
};

export default QuizView;
