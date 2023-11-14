document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const city = cityInput.value;

        getWeatherData(city)
            .then(data => {
                // Display the weather data
                weatherResult.innerHTML = generateWeatherHTML(data);
                weatherResult.classList.remove("hidden");
            })
            .catch(error => {
                weatherResult.textContent = `Error: ${error.message}`;
                weatherResult.classList.remove("hidden");
            });
    });

    async function getWeatherData(city) {
        const apiKey = 'ed2b967e9fc91f60717efeeb95b6a75e'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        return response.json();
    }

    function generateWeatherHTML(data) {
        // Your logic to format and display the weather data goes here
        // Adjust this function based on the structure of the data from the API
        const html = '<h2>Weather Data:</h2>'; // Add your HTML generation logic here
        return html;
    }
});
