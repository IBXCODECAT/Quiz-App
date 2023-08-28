console.log("end.js loaded");

const inpUser = document.getElementById("username");
const btnSaveScore = document.getElementById("save-score");
const txtFinalScore = document.getElementById("final-score");

const MOST_RECENT_SCORE = localStorage.getItem("most-recent-score");

//Display the final score (or 0 if there is no score)
txtFinalScore.innerText = MOST_RECENT_SCORE || 0;

//Disable the save button if the user hasn't entered a username
username.addEventListener("keyup", () => {
    btnSaveScore.disabled = !username.value;
});

saveHighScore = e => {
    //Prevent the form from submitting
    e.preventDefault();
}