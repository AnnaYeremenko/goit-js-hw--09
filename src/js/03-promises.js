import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const btmEl = document.querySelector('button');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');

let promise = null;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    promise = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}
form.addEventListener("submit", onClick);

function onClick(event) {
  event.preventDefault();

  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
  }
