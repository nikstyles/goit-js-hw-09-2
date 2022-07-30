const refs = () => {
  return {
    startBtn: document.querySelector('.js-start-timer'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  };
};

export default {
  refs,
};
