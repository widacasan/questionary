import React from 'react';
import he from 'he';

const HomeScreen = ({ startQuiz }) => (
  <div>
    <h1>Welcome to the Trivia Challenge!</h1>
    <p>You will be presented with 10 true or false questions.</p>
    <p>Can you score 100%?</p>
    <button onClick={startQuiz}>BEGIN</button>
  </div>
);

const QuestionResult = ({ question, userAnswer, correctAnswer }) => (
  <div style={{ color: userAnswer === correctAnswer ? 'green' : 'red' }}>
    <p>{he.decode(question)}</p>
    <p>Your answer: {userAnswer}</p>
    <p>Correct answer: {correctAnswer}</p>
    <hr />
  </div>
);

const ResultScreen = ({ userResults, playAgain }) => {
  const correctCount = userResults.filter(result => result.answer === 'True').length;
  const totalCount = userResults.length;

  return (
    <div>
      <h1>Results Screen</h1>
      <p>Score: {correctCount} / {totalCount}</p>
      {userResults.map((result, index) => (
        <QuestionResult
          key={index}
          question={result.question.question}
          userAnswer={result.answer}
          correctAnswer={result.question.correct_answer}
        />
      ))}
      <button onClick={playAgain}>PLAY AGAIN</button>
    </div>
  );
};

const TestScreen = ({ category, question, questionIndex, totalQuestions, onNextQuestion, onQuizFinish }) => {
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
    <div>
      <h1>{category}</h1>
      <p>{question}</p>
      <div>
        <button onClick={() => handleAnswer('True')}>True</button>
        <button onClick={() => handleAnswer('False')}>False</button>
      </div>
      {userAnswer !== null && (
        <div>
          <p>Your answer is: {userAnswer}</p>
          {questionIndex < totalQuestions - 1 ? (
            <button onClick={handleNextQuestion}>Next question</button>
          ) : (
            <button onClick={handleFinishQuiz}>Finish Quiz</button>
          )}
        </div>
      )}

      
      <p>{questionIndex + 1}/{totalQuestions}</p>
    </div>
  );
};

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
    <div>
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

const App = () => {
  const [questions, setQuestions] = React.useState([]);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizFinished, setQuizFinished] = React.useState(false);
  const [userResults, setUserResults] = React.useState([]);

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

  const playAgain = () => {
    setQuizFinished(false);
    setQuizStarted(false);
    setUserResults([]);
  };

  return (
    <div>
      {quizFinished ? (
        <ResultScreen userResults={userResults} playAgain={playAgain} />
      ) : quizStarted ? (
        <QuizScreen questions={questions} onQuizFinish={finishQuiz} playAgain={playAgain} />
      ) : (
        <HomeScreen startQuiz={startQuiz} />
      )}
    </div>
  );
};

export default App;
