import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

formElement.addEventListener('submit', event => {
  event.preventDefault();
  Number(firstDelay.value);
  Number(delayStep.value);
  Number(amount.value);
  console.log(Number(firstDelay.value), Number(delayStep.value));
  if (
    Number(firstDelay.value) < 0 ||
    Number(delayStep.value) < 0 ||
    Number(amount.value) < 0
  ) {
    Notiflix.Notify.warning('Value must be greater than null');
    firstDelay.value = '';
    delayStep.value = '';
    amount.value = '';
    return;
  }

  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i + 1, i * Number(delayStep.value) + Number(firstDelay.value))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  event.target.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
