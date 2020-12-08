
////////////////////////////////////////////////////////////
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create questions
let questions = [
    {
        question : "Inside which HTML element do we put the JavaScript?",
        choiceA : "js",
        choiceB : "javascript",
        choiceC : "script",
        correct : "C"
    },
    
    {
      question : "The external JavaScript file must contain the script tag.",
      choiceA : "true",
      choiceB : "false",
      correct : "A"
    },
    
    {
        question : "Which of these data types can be held as a variable?",
        choiceA : "function",
        choiceB : "boolean",
        choiceC : "array",
        correct : "C"
    },
    
    {
        question : "Where is the correct place to insert a JavaScript link?",
        choiceA : "css file",
        choiceB : "body",
        choiceC : "footer",
        correct : "B"
    },

    {
      question : "What is the correct syntax for referring to an external script called xxx.js?",
      choiceA : "script href= xxx.js",
      choiceB : "script name= xxx.js",
      choiceC : "script src= xxx.js",
      correct : "C"
  },

  {
    question : "What are the features of JavaScript?",
    choiceA : "JavaScript is a lightweight, interpreted programming language.",
    choiceB : "JavaScript is not a complementary to and integrated with Java.",
    choiceC : "JavaScript is not a open and cross-platform.",
    correct : "A"
  },

  {
    question : "Is javascript case-sensitive?",
    choiceA : "true",
    choiceB : "false",
    correct : "A"
  },

];

// variables
const lastQuestion = questions.length - 1;
let currentQuestion = 0;
let count = 0;
const questionTime = 5; // 5s
const gaugeWidth = 75; // 75px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


// start quiz
function startQuiz(){
    start.style.display = "none";
    displayQuestion();
    quiz.style.display = "block";
    updateProgress();
    updateCounter();
    // 1000ms = 1s
    TIMER = setInterval(updateCounter,1000); 
}

start.addEventListener("click",startQuiz);


// display a question
function displayQuestion(){
    let q = questions[currentQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


//progress bar update
function updateProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

//timer countdown for question
function updateCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(currentQuestion < lastQuestion){
            currentQuestion++;
            displayQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            newScore();
        }
    }
}

// checkAnwer
function checkAnswer(answer){
    if( answer == questions[currentQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
      }

    else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
      }
    
      count = 0;
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        displayQuestion();
      }
    else{
        // end the quiz and show the score
        clearInterval(TIMER);
        newScore();
      }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(currentQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(currentQuestion).style.backgroundColor = "#f00";
}

localStorage.setItem(scoreDiv, newScore);
var scorePerCent = localStorage.getItem(scoreDiv,"%<p>");

// score displayed
function newScore(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

