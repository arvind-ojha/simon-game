var a = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
const body = document.querySelector("body");
const levelTitle = document.getElementById("level-title");
document.addEventListener("keypress", function () {
    if (!started) {
        document.getElementById("level-title").innerHTML = `level ${level}`;
        nextSequence();
        started = true;
    }
});
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").innerHTML = `level ${level}`;
    var randomNumber = Math.floor(Math.random() * 4);
    var rcc = a[randomNumber];
    gamePattern.push(rcc);
    document.querySelector("#" + rcc).classList.add("FadeInFadeOut");
    setTimeout(function() {
        document.querySelector("#" + rcc).classList.remove("FadeInFadeOut");
    }, 50);
    playSound(rcc);
}
function checkTheAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    } else {
        playSound("wrong")
    body.classList.add("game-over");
    setTimeout(function() {
      body.classList.remove("game-over");
    }, 200);
    levelTitle.innerHTML = `Game Over, Press Any Key to Restart`;
    startOver();
  }
    
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
document.querySelectorAll(".btn").forEach(function(bt)  {
  bt.onclick = function() {
    let userChosenColor = bt.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkTheAnswer(userClickedPattern.length - 1);
  };
});
function animatePress(currentColor) {
    const buttons = document.querySelector(`#${currentColor}`);
  buttons.classList.add("pressed");
    setTimeout(function () {
      buttons.classList.remove("pressed");
    }, 100);
};
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}