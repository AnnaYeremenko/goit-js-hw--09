import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     if (selectedDates[0] > new Date()) {
         btnStart.removeAttribute("disabled");
     } else {
         Notiflix.Notify.failure("Please choose a date in the future");
         btnStart.setAttribute("disabled", "disabled");
     }    
  },
};

flatpickr(input, options);

const dataPickr = new flatpickr(input, options);

btnStart.addEventListener('click', btnStartClick);
function btnStartClick() {
    const startTime = dataPickr.selectedDates[0];

    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const time = convertMs(deltaTime);

        console.log('deltaTime', deltaTime);

        if (deltaTime < 0) {
            clearInterval(intervalId);
            return;
            
        }
        days.textContent = time.days;
        hours.textContent = time.hours;
        minutes.textContent = time.minutes;
        seconds.textContent = time.seconds;
    }, 1000);
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
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