import React, { useState } from 'react';

const HomeScreen = ({ startQuiz }) => (
  <div>
    <h1>Welcome to the Trivia Challenge!</h1>
    <p>You will be presented with 10 true or false questions.</p>
    <p>Can you store 100%?</p>
    <button onClick={startQuiz}>BEGIN</button>
  </div>
);

const QuizScreen = ({ questions }) => (
  <div>
    <h1>Trivia Questions</h1>
    {questions.map((question, index) => (
      <div key={index}>
        <h3>Pregunta {index + 1}</h3>
        <p>Categoría: {question.category}</p>
        <p>Dificultad: {question.difficulty}</p>
        <p>Pregunta: {question.question}</p>
        <p>Respuesta Correcta: {question.correct_answer}</p>
        <p>Respuesta Incorrecta: {question.incorrect_answers}</p>
        <hr />
      </div>
    ))}
  </div>
);

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
      const data = await response.json();
      setQuestions(data.results);
      setQuizStarted(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {quizStarted ? (
        <QuizScreen questions={questions} />
      ) : (
        <HomeScreen startQuiz={startQuiz} />
      )}
    </div>
  );
};

export default App;
