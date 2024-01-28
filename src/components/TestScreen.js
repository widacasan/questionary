import React from "react";
import he from "he";
import "../styles.css";

/**
 * Pantalla de prueba con una pregunta del quiz.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.category - Categoría de la pregunta.
 * @param {string} props.question - Pregunta.
 * @param {number} props.questionIndex - Índice de la pregunta actual.
 * @param {number} props.totalQuestions - Número total de preguntas.
 * @param {Function} props.onNextQuestion - Función para pasar a la siguiente pregunta.
 * @param {Function} props.onQuizFinish - Función para finalizar el quiz.
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de prueba.
 */

const TestScreen = ({
  category,
  question,
  questionIndex,
  totalQuestions,
  onNextQuestion,
  onQuizFinish,
}) => {
  const [userAnswer, setUserAnswer] = React.useState(null);

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const handleNextQuestion = () => {
    onNextQuestion(userAnswer);
    setUserAnswer(null);
  };

  const handleFinishQuiz = () => {
    onQuizFinish(userAnswer);
  };

  return (
    <div className="container test-container">
      <h1>{category}</h1>
      <p>{he.decode(question)}</p>
      <div className="answer-buttons">
        <button className="true-button" onClick={() => handleAnswer("True")}>
          True
        </button>
        <button className="false-button" onClick={() => handleAnswer("False")}>
          False
        </button>
      </div>
      {userAnswer !== null && (
        <div>
          <p>Your answer is: {userAnswer}</p>
          {questionIndex < totalQuestions - 1 ? (
            <button
              className="next-question-button"
              onClick={handleNextQuestion}
            >
              Next question
            </button>
          ) : (
            <button className="finish-quiz-button" onClick={handleFinishQuiz}>
              Finish Quiz
            </button>
          )}
        </div>
      )}

      <p className="progress">
        {questionIndex + 1}/{totalQuestions}
      </p>
    </div>
  );
};

export default TestScreen;
