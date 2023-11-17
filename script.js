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
    
            // Create a card element for each day
            const cardElement = document.createElement('div');
            cardElement.classList.add('weather-card');
    
            // Create elements to display the weather information
            const dateElement = document.createElement('p');
            dateElement.classList.add('date'); // Add class for date
            dateElement.textContent = date.toDateString();
    
            const tempElement = document.createElement('p');
            tempElement.classList.add('temperature'); // Add class for temperature
            tempElement.textContent = `${temperature}°C`;
    
            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('description'); // Add class for description
            descriptionElement.textContent = `${description}`;
    
            // Append elements to the card
            cardElement.appendChild(dateElement);
            cardElement.appendChild(tempElement);
            cardElement.appendChild(descriptionElement);
    
            // Append the card to the container
            weatherResult.appendChild(cardElement);
        }
    
        // Make the weather result container visible
        weatherResult.classList.remove("hidden");
    }
});
