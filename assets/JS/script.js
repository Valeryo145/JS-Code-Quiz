var StartButtonEl = document.getElementById("start");
var timerCountEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var optionsEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var EndingscoreEl = document.getElementById("score");
var startQuestionsEl = document.getElementById('start-questions');

var questionIndex = 0;
var time = 60;
var timerId;

var questions = [
  {
    title: "Commonly used data DO NOT Include:",
    options: ["1.Strings", "2.Booleans", "3.Alerts", "4.Numbers"],
    answer: "3.Alerts"
  },
  {
    title: "The condition in an if/else statement is enclosed within _______.",
    options: ["1.Quotes", "2.Curly ", "3.Parenthesis", "4.Square "],
    answer: "3.Parenthesis"
  },
  {
    title: "Arrays in JavaScript can be used to store ______.",
    options: ["1.Numbers ", "2.Other ", "3.Booleans", "4.All of the above"],
    answer: "4.All of the above"
  },
  {
    title:"String values must be enclosed within ______ when being assigned to variables.",
    options: ["1.Commas", "2.Curly Brackets ", "3.Quotes", "4.Parentheses"],
    answer: "3.Quotes"
  },
  {
    title: "A very useful tool used during development and debugging for printing content to the debugger is",
    options: ["1.JavaScript", "2.Terminal/Bash", "3.For Loops", "4.Console.log"],
    answer: "4.Console.log"
  },
];

// click button to start quiz
StartButtonEl.onclick = startQuiz;

function startQuiz() {
  var quizChallenge = document.getElementById("quizChallenge");
  quizChallenge.setAttribute("class", "hide");
  //quizChallenge.classList.add('hide');

  //shows questions 
  questionsEl.removeAttribute('class');
  startQuestionsEl.removeAttribute('class');

  timerCountEl.textContent = time;
  // start timer
  timerId = setInterval(function () {
      time--;
      timerCountEl.textContent = time;
  
    }, 1000)

  showQuestion(questionIndex);
}

function showQuestion(questionIndex) {
    questions.innerHTML = "";
    optionsEl.innerHTML = "";
    var currentQuestion = questions[questionIndex];
    var questionOptions = questions[questionIndex].options;
    questionsEl.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.options.length; i++) {
      var buttonTag = document.createElement('button');
      buttonTag.textContent = currentQuestion.options[i];
      buttonTag.addEventListener('click', checkAnswer);
      optionsEl.appendChild(buttonTag);
    } 
  
}

function checkAnswer(e) {

  var clicked = e.target.textContent;
  var currentQuestion = questions[questionIndex].answer;
 
  if(clicked === currentQuestion){
    alert('Correct!');
    questionIndex++;
    showQuestion(questionIndex);
   
  }else{
    alert('Incorrect!')
    questionIndex++;
    showQuestion(questionIndex);
    time-=10
  }
}

function endScreen() {
  clearInterval(timerId); 
  lastQuestion.clearInterval('hide');
  EndingscoreEl.textContent = time;
}







//Highscore saved to local storge 
// click button to submit initials
//submitBtn.onclick = saveHighscore;
