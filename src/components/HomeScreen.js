import React from "react";
import "../styles.css";

/**
 * Componente para la pantalla de inicio del juego.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.startQuiz - Función para comenzar el cuestionario.
 * @returns {JSX.Element} Retorna el JSX que representa la pantalla de inicio.
 */
const HomeScreen = ({ startQuiz }) => (
  <div className="container">
    <h1>Welcome to the Trivia Challenge!</h1>
    <p>You will be presented with 10 true or false questions.</p>
    <p>Can you score 100%?</p>
    <button className="start-button" onClick={startQuiz}>
      BEGIN
    </button>
  </div>
);

export default HomeScreen;
