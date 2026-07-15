let id = 'c31cfa69befc9990c783d5c013ffdbdd';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if (valueSearch.value.trim() !== '') {
        searchWeather(valueSearch.value.trim());
    }
});

const searchWeather = (cityName) => {
    let url = `${baseURL}&q=${cityName}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = Math.round(data.main.temp);
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                showError();
            }
            valueSearch.value = '';
        })
        .catch(error => {
            console.error("Fetch error:", error);
            showError();
            valueSearch.value = '';
        });
};

const showError = () => {
    main.classList.add('error');
    setTimeout(() => {
        main.classList.remove('error');
    }, 1000);
};

// Default city on load
const initApp = () => {
    valueSearch.value = 'Madurai';
    searchWeather(valueSearch.value);
};
initApp();







