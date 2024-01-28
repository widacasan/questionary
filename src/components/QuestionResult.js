import React from "react";
import he from "he";
import "../styles.css";

/**
 * Componente para mostrar el resultado de una pregunta.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.question - La pregunta.
 * @param {string} props.userAnswer - La respuesta proporcionada por el usuario.
 * @param {string} props.correctAnswer - La respuesta correcta.
 * @returns {JSX.Element} Retorna el JSX que representa el resultado de la pregunta.
 */
const QuestionResult = ({ question, userAnswer, correctAnswer }) => (
  <div
    className={`result ${
      userAnswer === correctAnswer ? "correct" : "incorrect"
    }`}
  >
    <p>{he.decode(question)}</p>
    <p>Your answer: {userAnswer}</p>
    <p>Correct answer: {correctAnswer}</p>
    <hr />
  </div>
);

export default QuestionResult;
