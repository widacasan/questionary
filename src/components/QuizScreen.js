import React from "react";
import TestScreen from "./TestScreen";
import ResultScreen from "./ResultScreen";
import he from "he";
import "../styles.css";

/**
 * Pantalla principal que gestiona el flujo del quiz.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.questions - Preguntas del quiz.
 * @param {Function} props.onQuizFinish - Función para finalizar el quiz.
 * @param {Function} props.playAgain - Función para reiniciar el quiz.
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla principal del quiz.
 */

const QuizScreen = ({ questions, onQuizFinish, playAgain }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);

  const handleNextQuestion = (userAnswer) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex], answer: userAnswer },
    ]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishQuiz = () => {
    onQuizFinish(userAnswers);
  };

  return (
    <div className="quiz-container">
      {currentQuestionIndex < questions.length ? (
        <TestScreen
          category={he.decode(questions[currentQuestionIndex].category)}
          question={he.decode(questions[currentQuestionIndex].question)}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onNextQuestion={(userAnswer) => handleNextQuestion(userAnswer)}
          onQuizFinish={handleFinishQuiz}
        />
      ) : (
        <ResultScreen userResults={userAnswers} playAgain={playAgain} />
      )}
    </div>
  );
};

export default QuizScreen;
