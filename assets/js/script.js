// TIMER FUNCTIONS BELOW

const quizTimer = document.querySelector("#timer");

let timer = 75;
let interval;

function countdownClock() {
  interval = setInterval(function () {
    console.log(timer);
    quizTimer.innerText = timer;
    timer--;
    // console.log(timer);
    if (timer === 0) {
      console.log(timer);
      alert("You ran out of time!");
      endGame();
    }
  }, 1000);
}

//QUIZ FUNCTIONS BELOW

// ===============Quiz Questions=============
var questions = [
  {
    Question:
      "What tag is used in all HTML documents and helps define your title?",
    Options: [
      "<head></head>",
      "<header></header>",
      "<body></body>",
      "<main></main>",
    ],
    Correct: "<head></head>",
  },
  {
    Question: "What characteristic helps define ONE single element in HTML",
    Options: ["Class", "ID", "JavaScript", "Title"],
    Correct: "ID",
  },
  {
    Question: "What tag is used to properly reference your JavaScript file?",
    Options: ["<script>", "<link>", "<ref>", "<href>"],
    Correct: "<script>",
  },
  {
    Question: "var x = 3, var y = 4, var z = y, y = x ....What does x equal?",
    Options: ["3", "4", "undefined", "0"],
    Correct: "3",
  },
  {
    Question: "What is the definition of an 'Algorithm'",
    Options: [
      "A process or set of rules to be followed in calculations or other problem-solving operations",
      "An expression used for creating statements that are either TRUE or FALSE",
      "Lists or groups of similar types of data values that are grouped",
      "A location that stores temporary data within a program which can be modified, store and display whenever need",
    ],
    Correct:
      "A process or set of rules to be followed in calculations or other problem-solving operations",
  },
  {
    Question:
      "Which of the following would be used to properly recall a 'Class' in CSS or JavaScript",
    Options: ["#clockface", "@clockface", ".clockface", "*clockface"],
    Correct: ".clockface",
  },
  {
    Question: "What does HTML stand for?",
    Options: [
      "HyperText Markup Language",
      "HyperText Madeup Literature",
      "Honorary Text Markup Literature",
      "HomeoText Markup Language",
    ],
    Correct: "HyperText Markup Language",
  },
  {
    Question:
      "What is the proper order in your terminal to get your code to your GitHub?",
    Options: [
      "git add, git commit, git push",
      "git pull, git commit, git add",
      "git status, git add, git pull",
      "git pull, git add, git push",
    ],
    Correct: "git add, git commit, git push",
  },
];

var thisQuestionIndex = 0;

var behindQuizBox = document.body;
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
    animateCorrect();
    localStorage.setItem("currentscore", userPoints);
    console.log(userPoints, timer);
  } else {
    timer -= 10;
    animateWrong();
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
  clearInterval(interval);

  quizTimer.innerText = "GAME OVER";

  // Remove all answers
  displayQuestion.textContent = "";
  while (displayAnswers.firstChild) {
    displayAnswers.removeChild(displayAnswers.firstChild);
  }

  // Pull the high score
  var highScore = localStorage.getItem("highscore");

  // Pull high score initials
  var hsinitials = localStorage.getItem("name");

  // Pull current score
  var currentScore = localStorage.getItem("currentscore");

  // If there is no high score, set it to 0
  if (highScore === null) {
    highScore = 0;
  }

  // Display high score or not
  if (currentScore > highScore) {
    var initials = prompt("Please enter your initials");
    localStorage.setItem("highscore", currentScore);
    localStorage.setItem("name", initials);
    displayQuestion.textContent =
      "Congratulations " +
      initials +
      "!!! You now hold the high score!!!! You finished the game with " +
      currentScore +
      " points!";
  } else {
    displayQuestion.textContent =
      "You have finished the game!  Your final score was " +
      currentScore +
      " points! Study harder to beat " +
      hsinitials +
      "'s score of " +
      highScore;
  }
};

function animateCorrect() {
  var time = 5;
  setInterval(function () {
    if (time % 2 === 1) {
      behindQuizBox.setAttribute("style", "background-color:green");
    } else if (time % 2 === 0) {
      behindQuizBox.setAttribute("style", "background-color:#ececec");
    }
    if (time === 0) {
      behindQuizBox.setAttribute("style", "background-color:#ececec");
      console.log("none and done");
      clearInterval();
    }
    time--;
  }, 100);
}

function animateWrong() {
  var time = 5;
  setInterval(function () {
    if (time % 2 === 1) {
      behindQuizBox.setAttribute("style", "background-color:red");
    } else if (time % 2 === 0) {
      behindQuizBox.setAttribute("style", "background-color:#ececec");
    }
    if (time === 0) {
      behindQuizBox.setAttribute("style", "background-color:#ececec");
      console.log("none and done");
      clearInterval();
    }
    time--;
  }, 100);
}

// START QUIZ FUNCTION
function startQuiz() {
  // Reset Points, questionindex, current score, and timer.
  userPoints = 0;
  thisQuestionIndex = 0;
  localStorage.setItem("currentscore", 0);
  timer = 75;

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
