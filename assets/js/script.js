// TIMER FUNCTIONS BELOW

const quizTimer = document.querySelector("#timer");

let timer = 100;

var countdown = function (duration, display) {
  var time = duration,
    minutes,
    seconds,
    milliseconds;

  setInterval(function () {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);
    milliseconds = parseInt(time, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.innerText = minutes + ":" + seconds;
    // console.log(display.innerText);
    // console.log(time);

    if (--time < 0) {
      time = duration;
    }
  }, 1000);
};

//QUIZ FUNCTIONS BELOW

var quizBox = document.querySelector(".quiz-box");

var questions = [
  {
    Question: "Question 1",
    Option1: "Answer1",
    Option2: "Answer2",
    Option3: "This is the correct answer(3)",
    Option4: "Answer4",
  },
  {
    Question: "Question 2",
    Option1: "Answer1",
    Option2: "This is the correct answer(2)",
    Option3: "Answer3",
    Option4: "Answer4",
  },
  {
    Question: "Question 3",
    Option1: "This is the correct answer(1)",
    Option2: "Answer2",
    Option3: "Answer3",
    Option4: "Answer4",
  },
  {
    Question: "Question 4",
    Option1: "Answer1",
    Option2: "This is the correct answer(2)",
    Option3: "Answer3",
    Option4: "Answer4",
  },
  {
    Question: "Question 5",
    Option1: "Answer1",
    Option2: "Answer2",
    Option3: "Answer3",
    Option4: "This is the correct answer(4)",
  },
];

// SHUFFLE AN ARRAY FUNCTION
var shuffle = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var newOrder = Math.floor(Math.random() * arr.length);
    var temp = arr[i];
    arr[i] = arr[newOrder];
    arr[newOrder] = temp;
    // console.log(arr);
  }
  return arr;
};

// =========FUNCTION THAT DISPLAYS THE QUESTION ANS ANSWERS PASSED THROUGH IT
var display = function (question, answers) {
  var displayQuestion = document.createElement("div");
  displayQuestion.className = "question-container";
  displayQuestion.textContent = question;

  var displayAnswers = document.createElement("div");
  displayAnswers.className = "answer-container";

  var answerOne = document.createElement("div");
  answerOne.className = "answer-box";
  answerOne.textContent = answers[0];
  answerOne.setAttribute("data-id", "answer1");
  displayAnswers.appendChild(answerOne);

  var answerTwo = document.createElement("div");
  answerTwo.className = "answer-box";
  answerTwo.textContent = answers[1];
  answerTwo.setAttribute("data-id", "answerTwo");
  displayAnswers.appendChild(answerTwo);

  var answerThree = document.createElement("div");
  answerThree.className = "answer-box";
  answerThree.textContent = answers[2];
  answerThree.setAttribute("data-id", "answerThree");
  displayAnswers.appendChild(answerThree);

  var answerFour = document.createElement("div");
  answerFour.className = "answer-box";
  answerFour.textContent = answers[3];
  answerFour.setAttribute("data-id", "answerFour");
  displayAnswers.appendChild(answerFour);

  quizBox.appendChild(displayQuestion);
  quizBox.appendChild(displayAnswers);
};

// ========FUNCTION THAT PROVIDES THE NEXT QUESTION==========
var nextQuestion = function (questionAndAnswers) {
  var currentQuestion = questionAndAnswers.Question;
  var theAnswers = [
    questionAndAnswers.Option1,
    questionAndAnswers.Option2,
    questionAndAnswers.Option3,
    questionAndAnswers.Option4,
  ];
  var newAnswerOrder = shuffle(theAnswers);

  console.log(currentQuestion, newAnswerOrder);

  display(currentQuestion, newAnswerOrder);
};

// nextQuestion(questions[1]);

var quizButton = document.querySelector("#start-button");

quizButton.addEventListener("click", countdown(timer, quizTimer));
quizButton.addEventListener("click", nextQuestion(questions[1]));
