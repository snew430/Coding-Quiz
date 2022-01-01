// TIMER FUNCTIONS BELOW

const quizTimer = document.querySelector("#timer");

let timer = 100;

function countdownClock() {
  setInterval(function () {
    quizTimer.innerText = timer;
    timer--;
    console.log(timer);
    if (timer < 0) {
      clearInterval(countdownClock);
      endGame();
    }
  }, 1000);
}

// var countdownClock = function (time) {
//   var countdown = setInterval(function () {
//     minutes = parseInt(time / 60, 10);
//     seconds = parseInt(time % 60, 10);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     quizTimer.innerText = minutes + ":" + seconds;

//     time--;
//     console.log(time)

//     if (time < 0) {
//       clearInterval(countdown);
//       alert("YOU RAN OUT OF TIME");
//       endGame();
//     }
//   }, 1000);

// if (end === 0) {
//   console.log("reached end of questions");
//   console.log(countdown);
//   clearInterval(countdown);
//   endGame();
// }
// };

//QUIZ FUNCTIONS BELOW

// ===============Quiz Questions=============
var questions = [
  {
    Question: "What tag is used in all HTML documents and helps define your title?",
    Options: ["<head></head>", "<header></header>", "<body></body>", "<main></main>"],
    Correct: "<head></head>",
  },
  {
    Question: "What characteristic helps define ONE single element in HTML",
    Options: ["Class", "ID", "JavaScript", "Title"],
    Correct: "ID",
  },
  {
    Question: "What tag is used to properly reference your JavaScript file?",
    Options: ["<sript>", "<link>", "<ref>", "<href>"],
    Correct: "<script>",
  },
  {
    Question: "var x = 3, var y = 4, var z = y, y = x ....What does x equal?",
    Options: ["3", "4", "undefined", "0"],
    Correct: "3",
  },
  {
    Question: "What type of definition can help pass multiple values at once in JS?",
    Options: ["Object", "Variable", "Function", "Interval"],
    Correct: "Object",
  },
];

var thisQuestionIndex = 0;

var behindQuizBox = document.querySelector(".main-body");
var quizBox = document.querySelector(".quiz-box");

var displayQuestion = document.createElement("div");
displayQuestion.className = "question-container";

var displayAnswers = document.createElement("div");
displayAnswers.className = "answer-container";

var userPoints = 0;

// ========FUNCTION THAT PROVIDES THE NEXT QUESTION==========
var nextQuestion = () => {
  // Deletes everything inside the quizbox
  displayQuestion.textContent = "";
  while (displayAnswers.firstChild) {
    displayAnswers.removeChild(displayAnswers.firstChild);
  }

  // Get the question
  var currentQuestion = questions[thisQuestionIndex].Question;

  // Display the question
  displayQuestion.textContent = currentQuestion;
  // Add the question as a child to the quizbox
  quizBox.appendChild(displayQuestion);

  var newAnswerOrder = shuffle(questions[thisQuestionIndex].Options);

  // Get and display the options
  newAnswerOrder.forEach((option, i) => {
    var answers = document.createElement("div");
    answers.className = "answer-box";
    answers.setAttribute("data-id", i);
    answers.textContent = option;
    answers.onclick = answerClick;
    displayAnswers.append(answers);
    quizBox.appendChild(displayAnswers);
  });
};

// ===========Clicking an answer moves the quiz forward================
function answerClick() {
  if (this.textContent == questions[thisQuestionIndex].Correct) {
    userPoints += 10;
    localStorage.setItem("currentscore", userPoints);
    console.log(userPoints, timer);
    // behindQuizBox.animate()
  } else {
    timer -= 10;
    console.log(userPoints, timer);
  }
  thisQuestionIndex++;
  if (thisQuestionIndex === questions.length) {
    endGame();
  } else {
    nextQuestion();
  }
}

// ==========SHUFFLE AN ARRAY FUNCTION============
var shuffle = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var newOrder = Math.floor(Math.random() * arr.length);
    var temp = arr[i];
    arr[i] = arr[newOrder];
    arr[newOrder] = temp;
  }
  return arr;
};

// ==========END GAME FUNCTION=============
var endGame = function () {
  timer = 0;
  console.log(countdownClock(), timer);
  // clearInterval(countdownClock());

  // Remove all answers
  displayQuestion.textContent = "";
  while (displayAnswers.firstChild) {
    displayAnswers.removeChild(displayAnswers.firstChild);
  }

  // Pull the high score
  var highScore = localStorage.getItem("highscore");

  // Pull current score
  var currentScore = localStorage.getItem("currentscore");

  // If there is no high score, set it to 0
  if (highScore === null) {
    highScore = 0;
  }

  // Display high score or not
  if (currentScore > highScore) {
    localStorage.setItem("highscore", currentScore);
    displayQuestion.textContent =
      "You now hold the high score!!!! You finished the game with " +
      points +
      " points!";
  } else {
    displayQuestion.textContent =
      "You have finished the game!  Your final score was " +
      currentScore +
      " points!";
  }
};

// START QUIZ FUNCTION
function startQuiz() {
  // Reset Points, questionindex, current score, and timer.
  userPoints = 0;
  thisQuestionIndex = 0;
  localStorage.setItem("currentscore", 0);
  timer = 100;

  // Clock and quiz questions start
  countdownClock();
  shuffle(questions);
  nextQuestion();
}
var quizButton = document.querySelector("#start-button");

// Clicking the button starts the game
quizButton.addEventListener("click", () => {
  startQuiz();
});
