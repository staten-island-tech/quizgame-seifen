(function () {
  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
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
      }

      else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What is 2+2?",
      answers: {
        a: "8",
        b: "3",
        c: "4",
      },
      correctAnswer: "c",
    },
    {
      question:
        "In California you can't legally buy a mousetrap without having what?",
      answers: {
        a: "a mouse",
        b: "a Hunting license",
        c: "a Driver's license",
        d: "children",
      },
      correctAnswer: "b",
    },
    {
      question: "Is the Earth flat?",
      answers: {
        a: "yes",
        b: "no",
      },
      correctAnswer: "a",
    },
    {
      question: "In Kansas it's illegal to eat cherry pie with what?",
      answers: {
        a: "Ice Cream",
        b: "Apple Pie",
        c: "A man over sixty",
        d: "Your mom",
      },
      correctAnswer: "a",
    },
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener("click", showResults);
})();
