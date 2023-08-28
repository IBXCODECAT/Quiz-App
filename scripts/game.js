console.log("game.js loaded");

//DOM ELEMENTS
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const txtScore = document.getElementById("score");
const txtProgress = document.getElementById("progress-text");
const elProgressFill = document.getElementById("progress-fill");

console.log(choices);

//VARIABLES
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=20&type=multiple").then(res => {
    return res.json();
}).then(loadedQuestions => {
    
    //Map the loaded questions to a new array formatted the way we want
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        }

        //Map the loaded question's incorrect answers to a new array
        const answerChoices = [...loadedQuestion.incorrect_answers];

        //Randomly insert the correct answer into the answer choices array
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

        //Map the answer choices to the formatted question object
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        });

        return formattedQuestion;
    })
    startGame();
});

//CONSTANTS
const CORRECT_BONUS = 10; //How many points we want to give for each correct answer
const MAX_QUESTIONS = 3; //How many questions we want in our game
const FEEDBACK_DELAY = 50; //How long to show feedback




startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //Spread operator to copy the questions array
    getNewQuestion();
}

getNewQuestion = () => {
    //Check if there are any questions left, redirect to end page if none left
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //Store the score in local storage
        localStorage.setItem('most-recent-score', score);
        
        //Redirect to the end page
        return window.location.href = "../pages/end.html";
    }

    //Increment the question counter
    questionCounter++;

    //Update the HUD question counter text & progress bar
    txtProgress.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    elProgressFill.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    console.log((questionCounter / MAX_QUESTIONS) * 100);

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
        
        //Check if the answer is correct
        const answer_correctness = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        selectedChoice.parentElement.classList.add(answer_correctness);
        
        //Increment the score if the answer is correct
        if(answer_correctness === 'correct') incrementScore(CORRECT_BONUS);

        //Delay the next question and give user feedback
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(answer_correctness);
            getNewQuestion();
        }, FEEDBACK_DELAY);
    });
});

//Increment the score
incrementScore = num => {
    score += num;
    txtScore.innerText = score;
}