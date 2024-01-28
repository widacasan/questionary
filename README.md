# Trivia Challenge React App

## Description

This project is a trivia application built with React. It allows users to participate in a challenge of 10 true or false questions and displays the results at the end of the game. The questions are fetched from the Trivia OpenTDB API.

## Features

 ## Home Screen:
- Welcome message.
- Challenge description.
- Button to start the quiz.


 ## Question Screen:

- Presents true or false questions.
- Displays answer options.
- Tracks the progress of the question.
- Allows moving to the next question or finishing the quiz.

 ## Results Screen:

- Shows the total score.
- Details for each question with - correct and incorrect answers.
- Button to play again.

## Project Structure

- *src/components/:* Contains React components of the application, such as HomeScreen, TestScreen, ResultScreen, etc.
- *src/services/api.js:* File handling the logic to fetch questions from the Trivia OpenTDB API.
- *src/App.js:* Main component managing the flow of the application.
- *src/index.js:* Main entry point rendering the application to the DOM.
- *src/styles.css:* Global styles file for the application.

## Getting Started

1. Clone the repository: `git clone https://github.com/widacasan/questionary.git`

2. Navigate to the project directory: `cd questionary`

3. Install dependencies: `npm install`

4. Start the application: `npm start`

5. Open your browser and visit [http://localhost:3000](http://localhost:3000)


## Versions

- **Node.js:** v21.4.0
- **npm:** 10.2.4

## Dependencies

- **React and ReactDOM:** It is recommended to use React v18.2.0 or higher.
- **React Scripts:** The recommended minimum version of `react-scripts` is 5.0.1. You can install it by running `npm install react-scripts@5.0.1`.
- **He:** The application uses the "he" library. It is recommended to use version 1.2.0 or higher.

## License

This project is under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.