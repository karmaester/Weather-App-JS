import "./scss/styles.scss"

const api = {
    key: "0f3a4380db207fb3fc5258bdb3e25fa3",
    base: "https://api.openweathermap.org/data/2.5/"
}

const toFahrenheit = (val) => {
   let newVal= Math.round((val * 9) / 5 + 32);
   return newVal;
};

const toCelsius = (val) => {
   let newVal= Math.round((val - 32) * 5/9);
   return newVal;
};
  
const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        getResults(searchbox.value);
    }
});

const tempChanger = document.querySelector('.temp-changer');
const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');
tempChanger.addEventListener('click', (e) => {
    console.log(tempChanger.innerText);
    let temps = document.querySelectorAll('.temperature');
    let letters = document.querySelectorAll('.letter');
    if (celsius.classList.contains("bolder")) {
        celsius.classList.toggle("bolder");
        fahrenheit.classList.toggle("bolder");
        temps.forEach((temp) => {
            temp.innerText = `${toFahrenheit(Number(temp.innerText))}`;
        })
        letters.forEach((letter) => {
            letter.innerText = `°f`;
        })
    } else {
        celsius.classList.toggle("bolder");
        fahrenheit.classList.toggle("bolder");
        temps.forEach((temp) => {
            temp.innerText = `${toCelsius(Number(temp.innerText))}`;
        })
        letters.forEach((letter) => {
            letter.innerText = `°c`;
        })
    }
});

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
    return weather.json();
    }).then(displayResults)
    .catch(() => {
        alert("Input a valid city");
      });
    }

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `<span class="temperature">${Math.round(weather.main.temp)}</span><span class="letter">°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `<span class="temperature">${Math.round(weather.main.temp_min)}</span><span class="letter">°c</span> / <span class="temperature">${Math.round(weather.main.temp_max)}</span><span class="letter">°c</span>`;

    let form = document.querySelector('.search');
    form.value = '';
}
 
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
 