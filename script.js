var start = new Date().getTime();
let fastestTime = Infinity;
let firstClick = true;
let audio = new Audio("sounds/confetti.mp3");
const highScore = document.createElement("div");

//generate a random hex color code from the string
function randColor() {
  var col = "0123456789ABCDEF".split("");
  var color = "#";
  for (i = 0; i < 6; i++) {
    color += col[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayHighScore(lowesetTime){
  highScore.classList.add("high-score");
  highScore.textContent = `Fastest time: ${lowesetTime}s`;
  highScore.style.position = "fixed";
  highScore.style.top = "1.5rem";
  highScore.style.left = "1.5rem";
  highScore.style.fontSize = "2rem";
  highScore.style.color = "#27c93f";

  document.body.appendChild(highScore);
}

function triggerConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 100 * (timeLeft / duration);

    window.confetti({
      particleCount: particleCount,
      spread: randomInRange(100, 200),
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    });
  }, 350); 
}

function ShapeAppear() {
  var gameContainer = document.getElementById("gameContainer");

  var containerWidth = gameContainer.offsetWidth;
  var containerHeight = gameContainer.offsetHeight;

  var top = Math.random() * (containerHeight - 200);
  var left = Math.random() * (containerWidth - 200);
  var width = Math.random() * 100 + 100;

  var shape = document.getElementById("shape");

  if (Math.random() > 0.5) {
    shape.style.borderRadius = "50%";
  } else {
    shape.style.borderRadius = "0";
  }

  shape.style.height = width + "px";
  shape.style.width = width + "px";
  shape.style.top = top + "px";
  shape.style.left = left + "px";
  shape.style.backgroundColor = randColor();

  shape.style.display = "block";
  start = new Date().getTime();
}

function AppearAgain() {
  setTimeout(ShapeAppear, Math.random() * 2000);
}
AppearAgain();

function displayNewFastestTime(time) {
  // Create a div element for displaying the text
  const newTextDiv = document.createElement("div");
  newTextDiv.classList.add("new-fastest-time");
  newTextDiv.textContent = `New fastest!!`;
  displayHighScore(time);

  // Append the div to the body
  document.body.appendChild(newTextDiv);

  // Remove the div after a certain duration (e.g., 5 seconds)
  setTimeout(() => {
    newTextDiv.classList.add("fade-out"); // Apply fade-out class after a short delay
    setTimeout(() => {
      newTextDiv.remove(); // Remove the element after the transition ends
    }, 5000); // Transition duration (same as the opacity transition duration)
  }, 100);
}

document.getElementById("shape").onclick = function () {
  document.getElementById("shape").style.display = "none";
  var end = new Date().getTime();
  var time = (end - start) / 1000;
  document.getElementById("timeTaken").innerHTML = time + "s";
  // Compare the current time with the fastest time
  if (firstClick) {
    fastestTime = time;
  }
  if (!firstClick) {
    if (time < fastestTime) {
      highScore.remove();
      fastestTime = time; // Update fastest time
      triggerConfetti();
      audio.play();
      $("#timeTaken").css("color", "#27c93f");
      displayNewFastestTime(time); // Display the "New fastest time" text
    } else {
      $("#timeTaken").css("color", "");
    }
  }
  firstClick = false;
  AppearAgain();
};
// new updated code and branch