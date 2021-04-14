import { myQuestions } from "./questions.js";

(function () {
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (const letter in currentQuestion.answers) {
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      output.push(
        `<div class="question">${questionNumber + 1}. ${
          currentQuestion.question
        } </div>
          <div class="answers"> ${answers.join("")} </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    if (numCorrect < 0.6 * myQuestions.length) {
      resultsContainer.innerHTML =
        resultsContainer.innerHTML + `<div>You failed! :( </div>`;
    } else {
      resultsContainer.innerHTML =
        resultsContainer.innerHTML + `<div>Congrats! You passed!</div>`;
    }
    resultsContainer.innerHTML =
      `<div class = "answers">` + resultsContainer.innerHTML + `</div>`;
  }

  buildQuiz();

  submitButton.addEventListener("click", showResults);
})();
