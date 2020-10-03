let questions = [
  {
    question:
      "Companies that continue to operate even though they’re bankrupt are called ?",
    allAnswers: ["Mummy", "Zombie", "DeadWater"],
    correctAnswer: "Zombie",
  },
  {
    question: "Lets get this Bread, refers to",
    allAnswers: ["Debt", "Food", "Money"],
    correctAnswer: "Money",
  },
  {
    question: "In what year was the first U.S. penny minted? ",
    allAnswers: ["1792", "1620", "1865"],
    correctAnswer: "1792",
  },
  {
    question:
      "What is the highest $ value of currency ever issued by the U.S. government?",
    allAnswers: ["The 100 bill", "The $500 bill", "The $100,000 bill"],
    correctAnswer: "The $100,000 bill",
  },
  {
    question: "What is the offical term for the HEAD side of the coin?",
    allAnswers: ["Front", "IPS (Important Person Side)", "Obverse"],
    correctAnswer: "Obverse",
  },
  {
    question: "What is the science of coins called?",
    allAnswers: ["Centology", "Greed", "Numismatics"],
    correctAnswer: "Numismatics",
  },
  {
    question: "The term 'E Pluribus Unum' represents what?",
    allAnswers: [
      "The original thirteen colonies",
      "The year America was discovered",
      "The pen used for the signature on all dollars",
    ],
    correctAnswer: "The pen used for the signature on all dollars",
  },
  {
    question: "Why do we call a dollar a 'buck'?",
    allAnswers: [
      "The first dollar was made from the skin of a male deer",
      "In the frontier days, the pelt of a male deer was worth a dollar",
      "Buck was the artist that drew the design on the first paper money",
    ],
    correctAnswer: "The first dollar was made from the skin of a male deer",
  },
  {
    question: "The word “tax” originates from:",
    allAnswers: [
      "The Latin taxo, meaning “I estimate”",
      "The Greek taxum, meaning “to take",
      "Taxi,” which takes you places for a fee",
    ],
    correctAnswer: "The Latin taxo, meaning “I estimate”",
  },
  {
    question: "Which is better?",
    allAnswers: [
      "Getting $100,000 at once",
      "Getting a penny that’s doubled every day for a 31-day month.",
    ],
    correctAnswer:
      "Getting a penny that’s doubled every day for a 31-day month.",
  },
];

// defined all the variables on top.
// all variables that manipulate the DOM
let content = document.getElementById("content");
let results = document.getElementById("results");

let questionDiv = document.getElementById("questionDiv");
let questionHolder = document.getElementById("question");
let choicesHolder = document.getElementById("choices");
let scoreHolder = document.getElementById("score");
let submitButton = document.getElementById("submit");
// things that need to be tracked.
let questionTracker = 0;
let score = 0;
let wasQuestionAsked = true;

let playerOne = 0;
let playerOneScore = 0;

let playerTwo = 0;
let currentPlayer = "playerOne";
let timerTime;

//This function hides my questions and until they are used.
function showQuestionDiv() {
  questionDiv.hidden = false;
  choicesHolder.hidden = false;
  submitButton.hidden = false;
  scoreHolder.hidden = false;
  results.hidden = true;
}

function hideQuestionDiv() {
  questionDiv.hidden = true;
  choicesHolder.hidden = true;
  submitButton.hidden = true;
  scoreHolder.hidden = true;
  results.hidden = false;
}

// this is the function that shows the first question and and shows the options.
function askQ() {
  showQuestionDiv();
  //loads the questions, and shows the answer
  let choices = questions[questionTracker].allAnswers;
  let tempChoices = "";

  for (let i = 0; i < choices.length; i++) {
    tempChoices +=
      "<input type='radio' name='quiz" +
      questionTracker +
      "' id='choice" +
      (i + 1) +
      "' value='" +
      choices[i] +
      "'>" +
      " <label for='choice" +
      (i + 1) +
      "'>" +
      choices[i] +
      "</label><br>";
  }

  //LOAD UP QUESTIONS

  questionHolder.textContent =
    "Question: " +
    (questionTracker + 1) +
    ". " +
    questions[questionTracker].question;
  // LOAD UP ANSWERS
  choicesHolder.innerHTML = tempChoices;

  // SETUP, FIRST ITERATION  keeps track of the score as it goes along
  if (questionTracker == 0) {
    scoreHolder.textContent =
      "Score: 0 correctly answered questions out of " +
      questions.length +
      " total questions.";
    submitButton.textContent = "SUBMIT QUESTION";
  }
}
// function to check if the question was corrected determined by the radio buttons.
function validateAnswer() {
  // CHECK IF QUESTION WAS ASKED, DETERMINE IF WE PROCEED TO NEXT QUESTION
  if (wasQuestionAsked) {
    submitButton.textContent = "NEXT QUESTION";
    wasQuestionAsked = false;

    //DETERMINE WHICH RADIO BUTTON WAS CLICKED
    let userSelection, correctIndex;
    let radios = document.getElementsByName("quiz" + questionTracker);
    for (let i = 0; i < radios.length; i++) {
      //IF RADIO BUTTON IS CHECKED
      if (radios[i].checked) {
        userSelection = radios[i].value;
      }
      //FIND CORRECT INDEX keep score and change color
      if (radios[i].value == questions[questionTracker].correctAnswer) {
        correctIndex = i;
      }
    }

    labelChange = document.getElementsByTagName("label")[correctIndex].style;
    labelChange.fontWeight = "bold";
    // if the color is changed to green you add a point, if not then the color changes to red.
    if (userSelection == questions[questionTracker].correctAnswer) {
      score++;
      labelChange.color = "#33cc00";
    } else {
      labelChange.color = "#cc0000";
    }
    // showing and keeping track of score
    scoreHolder.textContent =
      "Score: " +
      score +
      " correctly answered questions out of " +
      questions.length +
      " possible.";
    // MOVE ON TO NEXT QUESTION
  } else {
    wasQuestionAsked = true;
    //RESET BUTTON TEXT TO "SUBMIT QUESTION"
    submitButton.textContent = "SUBMIT QUESTION";
    //IF WE HAVE NOT YET REACHED LAST QUESTION, INCREASE Q BY ONE
    if (questionTracker < questions.length - 1) {
      questionTracker++;
      askQ();
    } else {
      if (currentPlayer == "playerOne") {
        showPlayerOneScore();
      } else {
        finalResults();
      }
    }
  }
}

// FUNCTION THAT WILL DISPLAY THE SCORE ONCE TRIVIA GAME IS OVER
function showPlayerOneScore() {
  // hide the divs that hold the questions, choices, score etc. when you call this
  hideQuestionDiv();

  results.innerHTML =
    "<h2>You've finished the Trivia Game!</h2>" +
    "<h2>These are your results:</h2>" +
    "<h2>" +
    score +
    " out of a total of " +
    questions.length +
    " questions." +
    "<br>" +
    "Your percentage was: " +
    Math.round((score / questions.length) * 100) +
    // removed the class on the button, it wasn't doing anything
    "</h2>" +
    "<br>" +
    "<button onclick='reset()'>PLAYER 2's TURN</button>";
}

function finalResults() {
  // hide countdown when game ends
  document.getElementById("timer").hidden = true;
  content.innerHTML =
    "Player 1:" +
    playerOneScore +
    "<br> Player 2:" +
    score +
    "<br>Player " +
    (playerOneScore > score ? "1" : "2") +
    " wins!";
}

//FUNCTION THAT WILL RESET THE GAME
function reset() {
  if (currentPlayer == "playerOne") {
    document.getElementById("timer").innerHTML = "YOU RAN OUT OF TIME!";
    // reset timer for player 2
    clearInterval(timerTime);
    timer();
    questionTracker = 0;
    results.innerHTML = "";
    playerOneScore = score;

    debugger;

    score = 0;
    currentPlayer = "playerTwo";
    askQ();
  }
}

window.addEventListener("load", askQ, false);

//timer function that will keep track of time and display the final show if time runs out.

submitButton.addEventListener("click", validateAnswer, false);
let timer = () => {
  let remainingTime = 45;
  timerTime = setInterval(function () {
    if (remainingTime <= 0) {
      clearInterval(timerTime);
      document.getElementById("timer").innerHTML = "YOU RAN OUT OF TIME!";
      if (currentPlayer == "playerOne") {
        showPlayerOneScore();
      }
      // If player 2 runs out of time show final score
      if (currentPlayer == "playerTwo") {
        finalResults();
      }
    } else {
      document.getElementById("timer").innerHTML =
        remainingTime + " SECONDS LEFT!";
    }
    remainingTime -= 1;
  }, 1000);
};






//IGNORE all of the failed attemps below

// document.getElementById('alrt').innerHTML='<b>"Times Up!!!" </b>';
// setTimeout(function timer() {document.getElementById('alrt').innerHTML='';showFinalScore()
// ;},5000);

// let secs = 0;
//     let id = setInterval(function timer(){
//         secs++; console.log(secs);
//       if(secs> 9){
//         clearInterval(id);
//         alert("Time's up!");
//         showFinalScore();
//        }
//     }, 00);
// }

// let questionBox = document.getElementById("questions");
// let submitButton = document.getElementById("submit");
// let wasQuestionAsked = true;
// let questionTracker = 0;
// let score = 0;
// //let div0= document.querySelector("#questions");
// questions
// p1 = document.createElement("p")
// p1.innerText= "Companies that continue to operate even though they’re bankrupt are called ?"
// p1.classList.add("question1")
// div0.appendChild(p1)
// setTimeout(function () {
//   document.querySelector(".question1").style.display = "block";
// }, 30);
// setTimeout(function () {
//   document.querySelector(".question1").style.display = "none";
// }, 10000);
// // console.log(p1);
// // console.log(div0);
// //question 2
// p2 = document.createElement("p")
// p2.innerText = "Lets get this Bread, refers to ..."
// p2.classList.add("question2")
// div0.appendChild(p2)
// console.log(p2);
// console.log(div0);

// setTimeout(function () {
//     document.querySelector(".question2").style.display = "block";
//   }, 30000);
//   setTimeout(function () {
//     document.querySelector(".question2").style.display = "none";
//   }, 40000);

// var div = document.getElementById('questions');

// div.innerHTML +=

// let p0= document.createElement("p");
// p0.innerText(questionHolder)

// function getQuestion() {
//   const randomNumber = Math.floor(Math.random() * myQuestions.length);

//   questionBox.appendChild(document.createElement("br"));
//   let question = document.createElement("h3");
//   let text = document.createTextNode(myQuestions[randomNumber].question); // function calls the questions to the board
//   question.appendChild(text);
//   console.log(typeof question);

//   questionBox.appendChild(question); // writes the questions on the  board
//   let options = myQuestions[randomNumber].allAnswers; // calls the answers to the board
//   questionBox.appendChild(document.createElement("br"));
//   let name = "radio" + randomNumber;
