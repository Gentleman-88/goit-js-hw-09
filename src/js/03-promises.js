import Notiflix from 'notiflix';


const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const obj = {
      position,
      delay,
    };
    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
}

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const initialDelay = +this.elements.delay.value;
  const step = +this.elements.step.value;
  const amount = +this.elements.amount.value;

  let delay = initialDelay;

  for (let i = 1; i <= amount; i++) {
    try {
      const result = await createPromise(i, delay);
      Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }
    delay += step;
  }
});
