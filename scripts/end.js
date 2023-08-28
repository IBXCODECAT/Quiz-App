console.log("end.js loaded");

const inpUser = document.getElementById("username");
const btnSaveScore = document.getElementById("save-score");
const txtFinalScore = document.getElementById("final-score");

//Get the most recent score and high scores from local storage
const MOST_RECENT_SCORE = localStorage.getItem("most-recent-score");
const HIGH_SCORES = JSON.parse(localStorage.getItem("high-scores")) || [];

const MAX_HIGH_SCORES = 5;

//Display the final score (or 0 if there is no score)
txtFinalScore.innerText = MOST_RECENT_SCORE || 0;

//Disable the save button if the user hasn't entered a username
username.addEventListener("keyup", () => {
    btnSaveScore.disabled = !username.value;
});

saveHighScore = e => {
    //Prevent the form from submitting
    e.preventDefault();

    //Create a score object and add it to the high scores array
    const score = {
        score: MOST_RECENT_SCORE,
        name: username.value,
    };

    //Add the score to the high scores array
    HIGH_SCORES.push(score);

    //Sort the high scores array by score (descending)
    HIGH_SCORES.sort((a, b) => b.score - a.score);

    //Remove any scores that are not in the top 5
    HIGH_SCORES.splice(MAX_HIGH_SCORES);

    //Update the high scores in local storage
    localStorage.setItem("high-scores", JSON.stringify(HIGH_SCORES));

    window.locathref = "../index.html";
}