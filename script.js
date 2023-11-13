document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const city = cityInput.value;
        getWeather(city)
            .then(data => {
                weatherResult.textContent = `Weather in ${city}: ${data.weather}`;
            })
            .catch(error => {
                weatherResult.textContent = `Error: ${error.message}`;
            });
    });

    function getWeather(city) {
        return fetch(`https://api.example.com/weather?city=${city}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
});
