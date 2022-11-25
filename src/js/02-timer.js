import { convertMs } from './conver.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const inputData = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');

startButton.setAttribute('disabled', true);
let intervalId = null;
const fp = flatpickr(inputData, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      startButton.removeAttribute('disabled', true);
      startButton.addEventListener('click', function () {
        intervalId = setInterval(() => {
          startButton.setAttribute('disabled', true);
          const currentTime = Date.now();
          const time = selectedDates[0] - currentTime;

          days.textContent = addLeadingZero(convertMs(time).days);
          hours.textContent = addLeadingZero(convertMs(time).hours);
          minutes.textContent = addLeadingZero(convertMs(time).minutes);
          seconds.textContent = addLeadingZero(convertMs(time).seconds);
          if (Number(time) < 1000) {
            clearInterval(intervalId);
            Notify.info('Time is over!');
          }
        }, 1000);
      });
    } else {
      Notify.warning('Please choose a date in the future');
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
