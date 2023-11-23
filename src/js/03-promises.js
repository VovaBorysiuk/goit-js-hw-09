import { Notify } from 'notiflix/build/notiflix-notify-aio';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const promiseForm = document.querySelector('.form')

promiseForm.addEventListener('submit', async e => {
  e.preventDefault();

  const delay = +e.target.elements.delay.value;
  const step = +e.target.elements.step.value;
  const amount = +e.target.elements.amount.value;


  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + (i - 1) * step;
    try {
      await createPromise(i, currentDelay);
      Notify.success(`✅ Fulfilled promise ${i} in ${currentDelay}ms`);
    } catch (error) {
      Notify.failure(`❌ Rejected promise ${i} in ${currentDelay}ms`);
    }
  }

});