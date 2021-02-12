
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var numOfKeypress = 0;


$('h1').click(function (event) {
  numOfKeypress++;
  if (numOfKeypress === 1) {
    nextSequence();
  }
})

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text(`LEVEL ${level}`);
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(150).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
  // console.log("gamePattern:" + gamePattern);
};

$('.btn').click(function (event) {
  var userChosenColor = event.toElement.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  var colorSound = new Audio(`sounds/${color}.mp3`);
  colorSound.play();
};

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass('pressed');
  setTimeout(function () {
    $(`.${currentColor}`).removeClass('pressed');
  }, 200)
};


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log('failed')
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over')
    }, 300);
    $('h1').html('Game Over, Press <i class="far fa-play-circle"></i> to Play Again!');
    var gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  numOfKeypress = 0;
}