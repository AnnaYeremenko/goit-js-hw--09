import '../css/common.css';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

startBtn.addEventListener("click", onClickbtnStart);
stopBtn.addEventListener("click", onClickbtnStop);

function onClickbtnStart(event) {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute('disabled', 'disabled');
        stopBtn.removeAttribute('disabled');
    }, 1000);
}

function onClickbtnStop(event) {
    clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}
