import React from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import fetchQuestions from "./services/api";
import "./styles.css";

/**
 * Componente principal de la aplicación.
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la aplicación.
 */

const App = () => {
  const [questions, setQuestions] = React.useState([]);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizFinished, setQuizFinished] = React.useState(false);
  const [userResults, setUserResults] = React.useState([]);

  /**
   * Función para iniciar el quiz y obtener preguntas desde la API.
   *
   * @async
   * @function
   */

  const startQuiz = async () => {
    const data = await fetchQuestions();
    setQuestions(data);
    setQuizStarted(true);
  };

  /**
   * Función para finalizar el quiz y mostrar los resultados.
   *
   * @param {Array} userAnswers - Respuestas del usuario.
   */

  const finishQuiz = (userAnswers) => {
    setUserResults(userAnswers);
    setQuizFinished(true);
  };

  /**
   * Función para reiniciar el quiz.
   */

  const playAgain = () => {
    setQuizFinished(false);
    setQuizStarted(false);
    setUserResults([]);
  };

  return (
    <div className="app-container">
      {quizFinished ? (
        <ResultScreen userResults={userResults} playAgain={playAgain} />
      ) : quizStarted ? (
        <QuizScreen
          questions={questions}
          onQuizFinish={finishQuiz}
          playAgain={playAgain}
        />
      ) : (
        <HomeScreen startQuiz={startQuiz} />
      )}
    </div>
  );
};

export default App;
