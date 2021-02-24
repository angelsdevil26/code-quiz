var questions = [
  {
    // Questions 1
    title: "In Scream, who do they think is the killer?",
    choices: ["Sideney Prescott", "Deputy Dewey", "Gale Weathers", "Sidney's Dad"],
    answer: "Sidney's Dad",
  },
  {
    // Question 2
    title: "What year was Scream made?",
    choices: ["1996", "2004", "1970", "1990"],
    answer: "1996",
  },
  {
    // Question 3
    title: "Who was the first person killed in Scream?",
    choices: ["Casey", "Sidney", "Gale", "Dewey"],
    answer: "Casey",
  },
  {
    // Question 4
    title: "Who was killed in the garage?",
    choices: ["Gale", "Dewey", "Billy", "Tatum"],
    answer: "Tatum",
  },
  {
    // Question 5
    title: "Who are the killers in Scream?",
    choices: [
      "Billy & Stu",
      "Sidney's dad & Sidney",
      "Casey & Stu",
      "Billy & Tatum",
    ],
    answer: "Billy & Stu",
  },
];

var questionEl = document.querySelector("#question");
var questionListEl = document.querySelector("#question-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var viewHighScores = document.querySelector("#viewHighScores");
var startBtn = document.querySelector("#startBtn");
var optionListEl = document.querySelector("#choices");
var mainArea = document.querySelector(".main-area")
var mainQuestions = document.querySelector(".main-questions")

var questionIndex = 0;
var correctCount = 0;

var time = questions.length * 5;
var intervalId;

startBtn.addEventListener("click", renderQuestion);

function renderQuestion() {

  mainArea.style.display = "none";
  mainQuestions.style.display = "block";

  optionListEl.innerHTML = "";
  questionEl.textContent = "";
  var currentQuestion = questions[questionIndex];
  console.log(currentQuestion);

  questionEl.textContent = currentQuestion.title;

  

  var choices = questions[questionIndex].choices;
  console.log(choices);
  var choicesLenth = choices.length;
  console.log(choices.length);

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function checkAnswer(event) {
  clearInterval(intervalId);
  var target = event.target;
  console.log(target);
  if (target.matches("li")) {
    var selectedChoice = event.target.textContent;
    if (selectedChoice === questions[questionIndex].answer) {
      correctCount++;
      questionResultEl.textContent = "Correct";
    } else {
      correctCount--;
      time -= 2;

      questionResultEl.textContent = "Incorrect";
    }
  }
  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  questionResultEl.textContent = "";
  questionIndex++;

  if (questionIndex === questions.length) {
    timer = 0;
    endQuiz();
  } else {
    renderQuestion();
  }
}

function updateTime() {
  timerEl.textContent = time;
  time--;

  if (time === 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(intervalId);

  setTimeout(showHighScore, 2000);
}
function showHighScore() {
  var name = prompt("Please enter your name");

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var contentUL = document.createElement("ul");

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.textContent =
      "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);
  }

  document.body.appendChild(contentUL);
}

function toHighScore() {
  clearInterval(intervalId);

  document.body.textContent = "";

  var high_score = localStorage.getItem("scores");

  if (!high_score) {
    high_score = [];
  } else {
    high_score = JSON.parse(high_score);
  }

  var user = {
    name: name,
    score: correctCount,
  };

  high_score.push(user);

  localStorage.setItem("scores", JSON.stringify(high_score));

  high_score.sort(function (a, b) {
    return b.score - a.score;
  });

  var heading = document.createElement("h2");
  heading.textContent = "Highscores";

  var div = document.createElement("div");

  document.body.append(div);
  div.setAttribute("class", "container highscores-display");

  div.append(heading);

  var contentUL = document.createElement("ul");
  contentUL.setAttribute("id", "highscore-list");

  var button = document.createElement("button");

  var clearButton = document.createElement("button");

  button.setAttribute("class", "customBtn");
  button.textContent = "Go back";

  clearButton.setAttribute("class", "customBtn");
  clearButton.textContent = "Clear Highscores";

  for (var i = 0; i < high_score.length; i++) {
    var contentLi = document.createElement("li");

    if (high_score[i].name != null && high_score[i].score != 0) {
      contentLi.innerHTML = `<strong>Player: </strong> ${high_score[i].name} <strong>Score:</strong> ${high_score[i].score}`;

      contentUL.append(contentLi);
    }
  }

  div.append(contentUL);

  div.append(button);

  div.append(clearButton);

  button.addEventListener("click", function () {
    location.reload();
  });

  clearButton.addEventListener("click", function () {
    localStorage.clear();
    contentUL.textContent = "";
  });
}

optionListEl.addEventListener("click", checkAnswer);
viewHighScores.addEventListener("click", toHighScore);
