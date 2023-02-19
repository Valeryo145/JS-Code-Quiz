var startButtonEl = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var timerCountEl = document.getElementById("time");
var optionsEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
//var startQuestionsEl = document.getElementById("start-questions")

//timer to start with 75 secs, can change to lower or higher
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// user clicks button to start quiz
startButtonEl.onclick = startQuiz;

function startQuiz() {
  var quizChallenge = document.getElementById("quizChallenge");
  quizChallenge.setAttribute("class", "start hide");
  questionsEl.setAttribute("class", " ");
  // func to start timer
  timerId = setInterval(function () {
    clockTick();
  }, 1000);
  // show starting time
  timerCountEl.textContent = time;

  showQuestion();
}

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionsEl.children[0].textContent = currentQuestion.title;
  while (optionsEl.hasChildNodes()) {
    optionsEl.removeChild(optionsEl.lastChild);
  }
  // loop over options
  for (var i = 0; i < currentQuestion.options.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.options[i];
    optionsEl.appendChild(choiceButton);
  }
  // create click event to each option 
  optionsEl.children[0].addEventListener("click", function (event) {
    questionClick(optionsEl.children[0]);
  });
  optionsEl.children[1].addEventListener("click", function (event) {
    questionClick(optionsEl.children[1]);
  });
  optionsEl.children[2].addEventListener("click", function (event) {
    questionClick(optionsEl.children[2]);
  });
  optionsEl.children[3].addEventListener("click", function (event) {
    questionClick(optionsEl.children[3]);
  });
}

function questionClick(answerOption) {
  // check if user wrong
  if (answerOption.textContent != questions[currentQuestionIndex].answer) {
    // penalize time by ten seconds
    time -= 10;
    feedbackEl.textContent = "Incorrect";
  } else {
    feedbackEl.textContent = "Correct";
  }
  //right or wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  //next question
  currentQuestionIndex++;

  // check if end of questions
  if (currentQuestionIndex === questions.length)
    // endScreen
    endScreen();
  // showQuestion
  else showQuestion();
}

function clockTick() {
  // update time
  time--;
  timerCountEl.textContent = time;
  if (time <= 0) endScreen();
}

function endScreen() {
  clearInterval(timerId);
  timerCountEl.textContent = time;

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions
  questionsEl.setAttribute("class", "hide");
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

function saveHighscore() {
  var initials = initialsEl.value.toUpperCase();
  if (initials === "") {
    alert("Initials Can't Be Blank");
    return;
  } else if (initials.length > 2) {
    alert("Can't be more than 2 characters");
    return;
  } else {
    // saved score to local storage, if non -null
    var highscores;
    if (JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else highscores = [];
    var newScore = {
      initials: initials,
      score: time,
    };
    highscores.push(newScore);
    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // move to scores page
    location.href = "scores.html";
  }
}

function finalEntered(event) {
  if (event.keyCode === 13) saveHighscore();
}
initialsEl.onkeyup = finalEntered;