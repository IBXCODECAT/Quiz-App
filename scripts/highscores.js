console.log("highscores.js loaded");

//DOM ELEMENTS
const highScoresList = document.getElementById("high-scores");

//Get the high scores from local storage (or an empty array if there are none)
const highscores = JSON.parse(localStorage.getItem("high-scores")) || [];

//Display the high scores by mapping each score to an HTML list item
highScoresList.innerHTML = 
    highscores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");