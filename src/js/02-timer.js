// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerID = null;
const value = true;

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
    const currentDate = Date.now();
    const timerInSeconds = selectedDates[0] - currentDate;

    if (timerInSeconds <= 0) {
      // alert("Please choose a date in the future");
      Notify.failure('Please choose a date in the future');
      return;
    }

    const objTimer = convertMs(timerInSeconds);

    renderTimer(objTimer);

    chageButtonStatus(!value);
    changeInputStatus(value);
  },
};

chageButtonStatus(value);
refs.btnStart.addEventListener('click', onClickStart);

const objFlatpickr = flatpickr(refs.inputDate, optionsFlatpickr);

//================================================================
function onClickStart() {
  chageButtonStatus(value);

  const selectTime = objFlatpickr.latestSelectedDateObj.getTime();
  //start a timer
  timerID = setInterval(startTime, 1000, selectTime);
}

//================================================================
function startTime(selectTime) {
  let currentDate = selectTime - Date.now();

  if (currentDate <= 0) {
    //stop a timer
    clearInterval(timerID);
    renderTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    disabBtnStart(value);
    changeInputStatus(!value);
    return;
  }

  const objTimer = convertMs(currentDate);
  renderTimer(objTimer);
}

//================================================================
function renderTimer(objTimer) {
  refs.dataDaysEl.innerText = makeNumInString(objTimer.days);
  refs.dataHoursEl.innerText = makeNumInString(objTimer.hours);
  refs.dataMinutesEl.innerText = makeNumInString(objTimer.minutes);
  refs.dataSecondsEl.innerText = makeNumInString(objTimer.seconds);
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

function chageButtonStatus(value) {
  refs.btnStart.disabled = value;
}

function changeInputStatus(value) {
  refs.inputDate.disabled = value
}

function makeNumInString(num) {
  return String(num).padStart(2, 0);
}




