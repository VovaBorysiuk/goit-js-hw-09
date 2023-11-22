// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerID = null;

const refs = {
  inputDate: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),

  dataDaysEl: document.querySelector('span[data-days]'),
  dataHoursEl: document.querySelector('span[data-hours]'),
  dataMinutesEl: document.querySelector('span[data-minutes]'),
  dataSecondsEl: document.querySelector('span[data-seconds]'),
};



const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  //minDate: new Date(),  // if set 'minDate' - alert not need
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    const timerInSeconds = selectedDates[0] - currentDate;

    if (timerInSeconds <= 0) {
      // alert("Please choose a date in the future");
      Notify.failure('Please choose a date in the future');
      return null;
    }

    const objTimer = convertMs(timerInSeconds);

    renderTimer(objTimer);

    refs.btnStart.disabled = false;
    refs.inputDate.disabled = true;
  },
};

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onClickStart);

const objFlatpickr = flatpickr(refs.inputDate, optionsFlatpickr);

//================================================================
function onClickStart() {
  refs.btnStart.disabled = true;

  const selectTime = objFlatpickr.latestSelectedDateObj.getTime();
  //start a timer
  timerID = setInterval(startTime, 1000, selectTime);
}

//================================================================
function startTime(selectTime) {
  let currentDate = selectTime - new Date().getTime();

  if (currentDate <= 0) {
    //stop a timer
    clearInterval(timerID);
    renderTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    refs.btnStart.disabled = true;
    refs.inputDate.disabled = false;
    return;
  }

  const objTimer = convertMs(currentDate);
  renderTimer(objTimer);
}

//================================================================
function renderTimer(objTimer) {
  refs.dataDaysEl.innerText = String(objTimer.days).padStart(2, 0);
  refs.dataHoursEl.innerText = String(objTimer.hours).padStart(2, 0);
  refs.dataMinutesEl.innerText = String(objTimer.minutes).padStart(2, 0);
  refs.dataSecondsEl.innerText = String(objTimer.seconds).padStart(2, 0);
}

//================================================================
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