const startButton = document.querySelector('button[data-action = "start"]');
const stopButton = document.querySelector('button[data-action = "stop"]');

startButton.addEventListener('click', createColor);
stopButton.addEventListener('click', stopChangeColor);
stopButton.setAttribute('disabled', true);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function activeButton() {
  if (createColor) {
    startButton.setAttribute('disabled', true);
  }
}

function createColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  activeButton();
  stopButton.removeAttribute('disabled', true);
}

function stopChangeColor() {
  startButton.removeAttribute('disabled', true);
  stopButton.setAttribute('disabled', true);
  clearInterval(timerId);
}
