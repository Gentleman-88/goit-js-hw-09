import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const elements = {
    textInput: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    valueDay: document.querySelector('[data-days]'),
    valueHour: document.querySelector('[data-hours]'),
    valueMinute: document.querySelector('[data-minutes]'),
    valueSecond: document.querySelector('[data-seconds]')
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
};

let intervalId;

const datetimePicker = flatpickr("#datetime-picker", options);

elements.btnStart.addEventListener('click', () => {
    const selectedDate = datetimePicker.selectedDates[0];
    const currentDate = new Date();

    if (!selectedDate || selectedDate <= currentDate) {
        Notiflix.Notify.warning('Please choose a date in the future');
        return;
    } else {
        intervalId = setInterval(() => {
            const currentTime = new Date();
            const diff = selectedDate - currentTime;
            const { days, hours, minutes, seconds } = convertMs(diff);
            if (diff <= 0) {
                clearInterval(intervalId);
                Notiflix.Notify.success('Times up');
            } else {
                elements.valueDay.textContent = days.toString().padStart(2, '0');;
                elements.valueHour.textContent = hours.toString().padStart(2, '0');;
                elements.valueMinute.textContent = minutes.toString().padStart(2, '0');;
                elements.valueSecond.textContent = seconds.toString().padStart(2, '0');;
            }
        }, 1000)
    }
});



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}








