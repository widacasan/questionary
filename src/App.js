import React, { useState } from 'react';
import he from 'he';

const HomeScreen = ({ startQuiz }) => (
  <div>
    <h1>Welcome to the Trivia Challenge!</h1>
    <p>You will be presented with 10 true or false questions.</p>
    <p>Can you score 100%?</p>
    <button onClick={startQuiz}>BEGIN</button>
  </div>
);

const TestScreen = ({ category, question, onNextQuestion, onQuizFinish, totalQuestions }) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  
  const handleAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const handleNextQuestion = () => {
    onNextQuestion(userAnswer);
    setUserAnswer(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleFinishQuiz = () => {
    onQuizFinish();
  };

  const questionProgress = `${currentQuestionIndex + 1}/${totalQuestions}`;

  return (
    <div>
      <h1>{category}</h1>
      <p>{question}</p>
     
      <div>
        <button onClick={() => handleAnswer('True')}>True</button>
        <button onClick={() => handleAnswer('False')}>False</button>
      </div>
      <p>{questionProgress}</p>
      {userAnswer !== null && (
        <div>
          <p>Your answer is: {userAnswer}</p>
          {currentQuestionIndex < totalQuestions - 1 ? (
            <button onClick={handleNextQuestion}>Next question</button>
          ) : (
            <button onClick={handleFinishQuiz}>Finish Quiz</button>
          )}
        </div>
        
      )}
    </div>
    
  );
};


const QuizScreen = ({ questions, onQuizFinish }) => {
  const [userAnswers, setUserAnswers] = useState([]);

  const handleNextQuestion = (userAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, { question: questions[userAnswers.length].question, answer: userAnswer }]);
  };



  return (
    <div>
      {userAnswers.length < questions.length ? (
        <TestScreen
          category={he.decode(questions[userAnswers.length].category)} 
          question={he.decode(questions[userAnswers.length].question)} 
          onNextQuestion={(userAnswer) => handleNextQuestion(userAnswer)}
          onQuizFinish={onQuizFinish}
          totalQuestions={questions.length}
        />
      ) : (
        <div>
          <h1>¡Quiz Finished!</h1>
          <button onClick={() => onQuizFinish(userAnswers)}>See results</button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userResults, setUserResults] = useState([]);

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

  const finishQuiz = (userAnswers) => {
    setUserResults(userAnswers);
    setQuizFinished(true);
  };

  return (
    <div>
      {quizFinished ? (
        <div>
          <h1>You scored</h1>
          <pre>{JSON.stringify(userResults, null, 2)}</pre>
        </div>
      ) : quizStarted ? (
        <QuizScreen questions={questions} onQuizFinish={finishQuiz} />
      ) : (
        <HomeScreen startQuiz={startQuiz} />
      )}
    </div>
  );
};

export default App;
