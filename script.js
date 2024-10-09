document.addEventListener('DOMContentLoaded', () => {
    const latitudeInput = document.getElementById('latitudeInput');
    const longitudeInput = document.getElementById('longitudeInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherBtn.addEventListener('click', () => {
        const latitude = latitudeInput.value.trim();
        const longitude = longitudeInput.value.trim();

        if (latitude && longitude) {
            fetchWeather(latitude, longitude);
        } else {
            weatherInfo.textContent = 'Please enter both latitude and longitude.';
        }
    });

    async function fetchWeather(latitude, longitude) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherInfo.textContent = error.message;
        }
    }

    function displayWeather(data) {
        const { temperature, windspeed } = data.current_weather;
        weatherInfo.innerHTML = `
            <p>Temperature: ${temperature}°C</p>
            <p>Wind Speed: ${windspeed} km/h</p>
        `;
    }
});