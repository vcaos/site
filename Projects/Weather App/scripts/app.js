const search = document.querySelector('form');
const card = document.querySelector('.card');
const weatherDetails = document.querySelector('.weather-details');
const time = document.querySelector('.time');

const updateUI = (data) => {
    const cityInfo = data.cityInfo;
    const weatherInfo = data.weatherInfo[0];

    // update weather-details template
    weatherDetails.innerHTML = `
        <h5 class="location">${cityInfo.EnglishName}</h5>
        <p class="condition">${weatherInfo.WeatherText}</p>
        <div class="temp">
            <span>${weatherInfo.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    // update the day/night images
    let timeSrc = null;
    if (weatherInfo.IsDayTime) {
        timeSrc = 'day.svg';
    }
    else {
        timeSrc = 'night.svg';
    }
    time.setAttribute('src', timeSrc);


    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};


const display = async (city) => {
    const cityInfo = await getCity(city);
    const weatherInfo = await getWeather(cityInfo.Key);

    return { cityInfo, weatherInfo };
};

search.addEventListener('submit', e => {
    // prevent page from refreshing
    e.preventDefault();

    // get the search value
    const city = search.city.value.trim();
    search.reset();

    // update the ui with the search value
    display(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    //localStorage.setItem('city', city);
});

/*
if (localStorage.getItem('city')) {
    display(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
*/