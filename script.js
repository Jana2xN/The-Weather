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
                generateWeatherHTML(data);
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
        const forecast = data.list;
    
        // Clear previous results
        weatherResult.innerHTML = '';
    
        // Iterate through the forecast data
        for (let i = 0; i < forecast.length; i += 8) {
            const dayData = forecast[i];
            const date = new Date(dayData.dt * 1000);
            const temperature = dayData.main.temp;
            const description = dayData.weather[0].description;
    
            // Create elements to display the weather information
            const dayElement = document.createElement('div');
            dayElement.classList.add('weather-day');
    
            const dateElement = document.createElement('p');
            dateElement.textContent = date.toDateString();
    
            const tempElement = document.createElement('p');
            tempElement.textContent = `Temperature: ${temperature}°C`;
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = `Description: ${description}`;
    
            // Append elements to the container
            dayElement.appendChild(dateElement);
            dayElement.appendChild(tempElement);
            dayElement.appendChild(descriptionElement);
    
            weatherResult.appendChild(dayElement);
        }
    
        // Make the weather result container visible
        weatherResult.classList.remove("hidden");
    }
});
