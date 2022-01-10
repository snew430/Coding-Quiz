var thisQuestionIndex = 0;

// Used for animation
var behindQuizBox = document.body;

// Main quiz area
var quizBox = document.querySelector(".quiz-box");

var displayQuestion = document.createElement("div");
displayQuestion.className = "question-container";

var displayAnswers = document.createElement("div");
displayAnswers.className = "answer-container";

var highScoresList = document.createElement("ol");

var quizButton = document.querySelector("#start-button");

// TIMER FUNCTIONS BELOW

const quizTimer = document.querySelector("#timer");

let timer = 75;
let interval;
var currentScore;

function countdownClock() {
  // Uses a global variable so tthe endGame function can stop it
  interval = setInterval(function () {
    quizTimer.innerText = timer;
    timer--;
    if (timer < 0) {
      alert("You ran out of time!");
      endGame();
    }
  }, 1000);
}

//QUIZ FUNCTIONS BELOW

// ===============Quiz Questions=============
var questions = [
  {
    // Each question has a question, a list of possible answers, and the correct answer
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
  // Checks if the content of the button you pressed = the content of the correct answer
  if (this.textContent == questions[thisQuestionIndex].Correct) {
    // userPoints += 10;
    currentScore += 10;
    animateCorrect();
    // localStorage.setItem("currentscore", userPoints);
  } else {
    // If not, you lise time
    timer -= 10;
    animateWrong();
  }
  thisQuestionIndex++;
  if (thisQuestionIndex === questions.length) {
    endGame();
  } else {
    nextQuestion();
  }
}

// Fun animation for correct answer
function animateCorrect() {
  var time = 5;
  // Take a 5 second interval and change the background color back and forth
  setInterval(function () {
    if (time % 2 === 1) {
      behindQuizBox.setAttribute("style", "background-color:green");
    } else if (time % 2 === 0) {
      behindQuizBox.setAttribute("style", "background-color:#ececec");
    }
    if (time === 0) {
      behindQuizBox.setAttribute("style", "background-color:#ececec");
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
      clearInterval();
    }
    time--;
  }, 100);
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

// =========HIGH SCORE FUNCTION========
function showScores() {
  // Reset the Ordered List
  highScoresList.innerHTML = "";

  // Get the current players info and log it
  var currentInit = prompt("Please enter initials");
  var userScores = {
    initials: currentInit,
    score: currentScore,
  };

  // Pull the previous high scores
  var scores = JSON.parse(localStorage.getItem("highscore")) || [];

  // Add the curent player to the mix....
  scores.push(userScores);

  console.log(scores)

  // And sort in order
  var newScoreList = scores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Render and display the top 6 players
  newScoreList.forEach(function (score) {
    var listScore = document.createElement("li");
    listScore.setAttribute(
      "style",
      "color:#5b5dca; font-size:2rem; margin:5px"
    );
    listScore.textContent = score.initials + " >>>>>> " + score.score;
    highScoresList.appendChild(listScore);
  });
  console.log(highScoresList)
  displayQuestion.textContent = "HIGH SCORES";
  displayAnswers.appendChild(highScoresList);

  // Save the top 5 scores
  var highScores = [];
  var maxScores = scores.length

  if (maxScores > 5){
    maxScores = 5
  }

  for (i = 0; i < maxScores; i++) {
    highScores.push(scores[i]);
  }

  localStorage.setItem("highscore", JSON.stringify(highScores));
}

// ==========END GAME FUNCTION=============
var endGame = function () {
  clearInterval(interval);

  quizTimer.innerText = "GAME OVER";

  // Remove all answers
  displayQuestion.textContent = "";
  while (displayAnswers.firstChild) {
    displayAnswers.removeChild(displayAnswers.firstChild);
  }

  showScores();
};

// START QUIZ FUNCTION
function startQuiz() {
  // Reset Points, questionindex, current score, and timer.
  userPoints = 0;
  thisQuestionIndex = 0;
  // localStorage.setItem("currentscore", 0);
  currentScore = 0;
  timer = 75;

  // Clock and quiz questions start
  countdownClock();
  // shuffle the question order
  shuffle(questions);
  nextQuestion();
}

// Clicking the button starts the game
quizButton.addEventListener("click", () => {
  startQuiz();
});
