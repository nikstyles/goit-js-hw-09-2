import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// import { refs } from './refs';

const refs = {
  startBtn: document.querySelector('.js-start-timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let dateForTimer = null;

disabledBtn(true);

// состояние активности кнопки
function disabledBtn(startBoole) {
  refs.startBtn.disabled = startBoole;
}

const options = {
  enableTime: true, // добавляет часы
  time_24hr: true, // время в формате 24ч
  defaultDate: new Date(), // устанавлевает сегодняшнею дату по дефолту
  minuteIncrement: 1, // не понял что делает
  onClose(selectedDates) {
    //метод который срабативает после выбора даты и закрытия окошка
    // console.log(selectedDates[0]);
    if (selectedDates[0] >= new Date()) {
      disabledBtn(false);
      dateForTimer = new Date(selectedDates);
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      disabledBtn(true);
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', startTimer);

function startTimer() {
  const timerId = setInterval(() => {
    const restOfTime = convertMs(dateForTimer - new Date());

    // обновляет интерфейс
    updateDataInterface(restOfTime);
  }, 1000);

  Notiflix.Notify.success('Timer started successfully');
  // Notiflix.Report.success('Title', 'Message', 'Button Text');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// функция, которая превращает одно число в строку с нулем впереди
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateDataInterface(dataObj) {
  const { days, hours, minutes, seconds } = dataObj;

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
console.log(new Date());
