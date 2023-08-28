//DOM ELEMENTS
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

//VARIABLES
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//CONSTANTS
const CORRECT_BONUS = 10; //How many points we want to give for each correct answer
const MAX_QUESTIONS = 3; //How many questions we want in our game

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //Spread operator to copy the questions array
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    //Check if there are any questions left, redirect to end page if none left
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign = "/pages/end.html";
    }

    //Increment the question counter
    questionCounter++;

    //Randomly select a question from the available questions array
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; //Display the question

    //Display the choices for the current question
    choices.forEach(choice => {
        const option_id = choice.dataset['oid'];
        choice.innerText = currentQuestion["choice" + option_id];
    });

    //Remove the question we just used from the available questions array
    availableQuestions.splice(questionIndex, 1);

    //Allow the user to answer the question
    acceptingAnswers = true;
};

//Add event listener to each choice
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["oid"];

        getNewQuestion();
    });
});

let questions = [
    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
  ];
  
  
startGame();