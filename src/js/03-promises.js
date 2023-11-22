import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  submitBtnEl: document.querySelector('button'),
};

refs.submitBtnEl.addEventListener('click', onCreatePromiseBtn);

//================================================================
function createPromise(position, delay, step) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timeDelay = delay + (position - 1) * step;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${timeDelay} ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${timeDelay} ms`);
      }
    }, timeDelay);
  });
}

//================================================================
function onCreatePromiseBtn(event) {
  event.preventDefault();

  const delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  const amount = Number(refs.amountEl.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay, step)
      .then(message => {
        Notify.success(message);
        console.log(message);
      })
      .catch(error => {
        Notify.failure(error);
        console.log(error);
      });
  }
}

