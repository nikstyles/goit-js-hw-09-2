const startBtn = document.querySelector('.js-start');
const stopBtn = document.querySelector('.js-stop');
let timerId = null;

stopBtn.disabled = true;
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.background = `${getRandomHexColor()}`;

    disabledBtn(true, false);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  disabledBtn(false, true);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disabledBtn(startBoole, stopBoole) {
  startBtn.disabled = startBoole;
  stopBtn.disabled = stopBoole;
}
