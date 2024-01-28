
/**
 * Función asincrónica para obtener preguntas desde la API externa de Trivia OpenTDB.
 *
 * @async
 * @function
 * @returns {Promise<Array>} - Promesa que resuelve con un array de preguntas.
 */

const fetchQuestions = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchQuestions;
