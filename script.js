'use strict';

const container = document.querySelector('.container');
const form = document.getElementById('weather-form');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const APIKey = 'ef8ab3b4b63713b45976165ea31d7c09';
  const city = form.querySelector('input').value.trim();

  if (city === '') return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404') {
        cityHide.textContent = city;
        container.style.height = '40rem';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      if (cityHide.textContent === city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = '55.5rem';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (data.weather[0].main) {
          case 'Clear':
            image.src = 'images/clear.png';
            break;

          case 'Rain':
            image.src = 'images/rain.png';
            break;

          case 'Snow':
            image.src = 'images/snow.png';
            break;

          case 'Clouds':
            image.src = 'images/cloud.png';
            break;

          case 'Mist':
            image.src = 'images/mist.png';
            break;

          case 'Haze':
            image.src = 'images/mist.png';
            break;

          default:
            image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
      }
    });
});
