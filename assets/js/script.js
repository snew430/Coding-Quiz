// TIMER FUNCTIONS BELOW

const quizTimer = document.querySelector("#timer");

let timer = 100;

var countdown = function (duration, display) {
  var time = duration,
    minutes,
    seconds;
  // milliseconds;

  setInterval(function () {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.innerText = minutes + ":" + seconds;


    if (--time < 0) {
      time = duration;
    }
  }, 1000);

  if (time === 0) {
    alert("YOU RAN OUT OF TIME");
    endGame();
  }
};

//QUIZ FUNCTIONS BELOW

var questions = [
  {
    Question: "Question 1",
    Options: ["Answer1", "Answer2", "This is the correct answer(3)", "Answer4"],
    Correct: "This is the correct answer(3)",
  },
  {
    Question: "Question 2",
    Options: ["Answer1", "This is the correct answer(2)", "Answer3", "Answer4"],
    Correct: "This is the correct answer(2)",
  },
  {
    Question: "Question 3",
    Options: ["This is the correct answer(1)", "Answer2", "Answer3", "Answer4"],
    Correct: "This is the correct answer(1)",
  },
  {
    Question: "Question 4",
    Options: ["Answer1", "This is the correct answer(2)", "Answer3", "Answer4"],
    Correct: "This is the correct answer(2)",
  },
  {
    Question: "Question 5",
    Options: ["Answer1", "Answer2", "Answer3", "This is the correct answer(4)"],
    Correct: "This is the correct answer(4)",
  },
];

var thisQuestionIndex = 0;

var behindQuizBox = document.querySelector(".main-body")
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
  while(displayAnswers.firstChild) {
    displayAnswers.removeChild(displayAnswers.firstChild);
  }

  // Get the question
  var currentQuestion = questions[thisQuestionIndex].Question;

  // Display the question
  displayQuestion.textContent = currentQuestion;
  // Add the question as a child to the quizbox
  quizBox.appendChild(displayQuestion);

  var newAnswerOrder = shuffle(questions[thisQuestionIndex].Options)
  console.log(newAnswerOrder)

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

function answerClick() {
  if (this.textContent == questions[thisQuestionIndex].Correct) {
    userPoints += 10;
    console.log(userPoints, timer);
    // behindQuizBox.animate()
  } else {
    timer -= 20;
    console.log(userPoints, timer);
  }
  thisQuestionIndex++;
  if (thisQuestionIndex === questions.length) {
    endGame(userPoints);
  } else {
    nextQuestion();
  }
}


// SHUFFLE AN ARRAY FUNCTION
var shuffle = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var newOrder = Math.floor(Math.random() * arr.length);
    var temp = arr[i];
    arr[i] = arr[newOrder];
    arr[newOrder] = temp;
  }
  return arr;
};

// END GAME FUNCTION
var endGame = function (points) {

  displayQuestion.textContent = "";
  while(displayAnswers.firstChild) {
    displayAnswers.removeChild(displayAnswers.firstChild);
  }

  displayQuestion.textContent = "You have finished the game!  You finished with " + points + " points!"
};

// START QUIZ FUNCTION
function startQuiz() {
  countdown(timer, quizTimer);
  userPoints = 0;
  nextQuestion();
}

var quizButton = document.querySelector("#start-button");

quizButton.addEventListener("click", () => {
  startQuiz();
});
