import React from "react";
import QuestionResult from "./QuestionResult";
import "../styles.css";

/**
 * Pantalla de resultados del quiz.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.userResults - Resultados de las preguntas.
 * @param {Function} props.playAgain - Función para reiniciar el quiz.
 * @returns {JSX.Element} - Elemento JSX que representa la pantalla de resultados.
 */

const ResultScreen = ({ userResults, playAgain }) => {
  const correctCount = userResults.filter(
    (result) => result.answer === "True"
  ).length;
  const totalCount = userResults.length;

  return (
    <div className="container result-container">
      <h1>Results Screen</h1>
      <p>
        Score: {correctCount} / {totalCount + 1}
      </p>
      {userResults.map((result, index) => (
        <QuestionResult
          key={index}
          question={result.question.question}
          userAnswer={result.answer}
          correctAnswer={result.question.correct_answer}
        />
      ))}
      <button className="play-again-button" onClick={playAgain}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default ResultScreen;
