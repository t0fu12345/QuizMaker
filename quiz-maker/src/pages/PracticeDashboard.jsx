import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import FilterCard from '../components/FilterCard';
import FilterModal from '../components/FilterModal';
import LoadingScreen from '../components/LoadingScreen';
import QuizView from '../components/QuizView';

const fetchQuestionsData = async (subjectId) => {
  switch(subjectId) {
    case 'c': return (await import('../../database/questions/c_questions.json')).default;
    case 'html5': return (await import('../../database/questions/html5_questions.json')).default;
    case 'reactjs': return (await import('../../database/questions/reactjs_questions.json')).default;
    case 'sql_server': return (await import('../../database/questions/sql_server_questions.json')).default;
    case 'uiux': return (await import('../../database/questions/uiux_questions.json')).default;
    case 'aiessen': return (await import('../../database/questions/aiessen_questions.json')).default;
    case 'github': return (await import('../../database/questions/github_questions.json')).default;
    default: return null;
  }
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const PracticeDashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);

  const handleStartQuiz = async (config) => {
    setIsFilterOpen(false);
    setIsLoading(true);

    try {
      const data = await fetchQuestionsData(config.subject);
      
      if (data && data.questions) {
        // Lấy ngẫu nhiên N câu hỏi
        const shuffledQuestions = shuffleArray(data.questions);
        const selectedQuestions = shuffledQuestions.slice(0, config.count);

        // Giả lập thời gian loading
        setTimeout(() => {
          setQuizData({
            subject: data.subject,
            questions: selectedQuestions
          });
          setIsLoading(false);
        }, 1500);
      } else {
        setIsLoading(false);
        alert('Không tìm thấy dữ liệu câu hỏi!');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setIsLoading(false);
      alert('Đã xảy ra lỗi khi tải câu hỏi.');
    }
  };

  const handleBackToDashboard = () => {
    setQuizData(null);
  };

  return (
    <div className="max-w-5xl mx-auto pt-4 relative">
      
      {/* Screens */}
      {quizData ? (
        <QuizView quizData={quizData} onBack={handleBackToDashboard} />
      ) : (
        <>
          <HeroBanner />
          <FilterCard onOpenFilter={() => setIsFilterOpen(true)} />
        </>
      )}

      {/* Modals & Overlays */}
      {isFilterOpen && (
        <FilterModal 
          onClose={() => setIsFilterOpen(false)} 
          onStart={handleStartQuiz} 
        />
      )}

      {isLoading && <LoadingScreen />}
      
    </div>
  );
};

export default PracticeDashboard;
