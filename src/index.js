import './scss/styles.scss';
import showAlert from './alert';

const api = {
  key: '0f3a4380db207fb3fc5258bdb3e25fa3',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const toFahrenheit = (val) => {
  const newVal = Math.round((val * 9) / 5 + 32);
  return newVal;
};

const toCelsius = (val) => {
  const newVal = Math.round(((val - 32) * 5) / 9);
  return newVal;
};

const tempChanger = document.querySelector('.temp-changer');
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');
tempChanger.addEventListener('click', () => {
  const temps = document.querySelectorAll('.temperature');
  const letters = document.querySelectorAll('.letter');
  if (celsius.classList.contains('bolder')) {
    celsius.classList.toggle('bolder');
    fahrenheit.classList.toggle('bolder');
    temps.forEach((temp) => {
      temp.innerText = `${toFahrenheit(Number(temp.innerText))}`;
    });
    letters.forEach((letter) => {
      letter.innerText = '°f';
    });
  } else {
    celsius.classList.toggle('bolder');
    fahrenheit.classList.toggle('bolder');
    temps.forEach((temp) => {
      temp.innerText = `${toCelsius(Number(temp.innerText))}`;
    });
    letters.forEach((letter) => {
      letter.innerText = '°c';
    });
  }
});

function dateBuilder(d) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `<span class="temperature">${Math.round(weather.main.temp)}</span><span class="letter">°c</span>`;

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerText = weather.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `<span class="temperature">${Math.round(weather.main.temp_min)}</span><span class="letter">°c</span> / <span class="temperature">${Math.round(weather.main.temp_max)}</span><span class="letter">°c</span>`;

  const form = document.querySelector('.search');
  form.value = '';

  if (fahrenheit.classList.contains('bolder')) {
    celsius.classList.toggle('bolder');
    fahrenheit.classList.toggle('bolder');
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json()).then(displayResults)
    .catch(() => {
      showAlert('Input a valid city');
    });
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    getResults(searchbox.value);
  }
});