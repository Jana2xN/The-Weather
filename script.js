document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    weatherForm.addEventListener("submit", handleWeatherFormSubmit);

    async function handleWeatherFormSubmit(event) {
        event.preventDefault();
        const city = cityInput.value;

        try {
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            displayErrorMessage(error);
        }
    }

    async function getWeatherData(city) {
        const apiKey = 'ed2b967e9fc91f60717efeeb95b6a75e'; // API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        return response.json();
    }

    function displayWeatherData(data) {
        const forecast = data.list;
        weatherResult.innerHTML = '';

        for (let i = 0; i < forecast.length; i += 8) {
            const dayData = forecast[i];
            const { dt, main, weather } = dayData;
            const { temp } = main;
            const { description } = weather[0];
            const date = new Date(dt * 1000);

            const cardElement = createWeatherCard(date, temp, description);
            weatherResult.appendChild(cardElement);
        }

        weatherResult.classList.remove("hidden");
    }

    function createWeatherCard(date, temperature, description) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('weather-card');
    
        const dateElement = createHTMLElement('p', 'date', date.toDateString());
        const tempElement = createHTMLElement('p', 'temperature', `${temperature}°C`);
        const descriptionElement = createHTMLElement('p', 'description', description);
    
        // Create a div for content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('weather-content');
    
        [dateElement, tempElement, descriptionElement].forEach(element => {
            contentDiv.appendChild(element);
        });
    
        cardElement.appendChild(contentDiv); // Append the content div to the card
    
        const iconElement = document.createElement('img');
        iconElement.classList.add('weather-icon');
        iconElement.src = getWeatherIcon(description);
    
        // Set width and height for the icon
        iconElement.style.width = '50px'; // Adjust this value according to your preference
        iconElement.style.height = '50px'; // Adjust this value according to your preference
    
        cardElement.appendChild(iconElement); // Append the icon after the content div
    
        return cardElement;
    }
    
    
    function getWeatherIcon(description) {
        const iconPath = 'images/';
        let iconFile = '';
    
        if (description.includes('clear sky')) {
            iconFile = 'clear sky.png';
        } else if (description.includes('few clouds')) {
            iconFile = 'few clouds.png';
        } else if (description.includes('scattered clouds')) {
            iconFile = 'scattered clouds.png';
        } else if (description.includes('broken clouds')) {
            iconFile = 'broken clouds.png';
        } else if (description.includes('shower rain')) {
            iconFile = 'shower rain.png';
        } else if (description.includes('rain')) {
            iconFile = 'rain.png';
        } else if (description.includes('thunderstorm')) {
            iconFile = 'thunderstorm.png';
        } else if (description.includes('snow')) {
            iconFile = 'snow.png';
        } else if (description.includes('mist') || description.includes('fog')) {
            iconFile = 'mist.png';
        } else if (description.includes('drizzle rain')) {
            iconFile = 'drizzle rain.png';
        } else if (description.includes('drizzle')) {
            iconFile = 'drizzle.png';
        } else if (description.includes('dust')) {
            iconFile = 'dust.png';
        } else if (description.includes('extreme rain')) {
            iconFile = 'extreme rain.png';
        } else if (description.includes('freezing rain')) {
            iconFile = 'freezing rain.png';
        } else if (description.includes('haze')) {
            iconFile = 'haze.png';
        } else if (description.includes('heavy intensity drizzle rain')) {
            iconFile = 'heavy intensity drizzle rain.png';
        } else if (description.includes('heavy intensity drizzle')) {
            iconFile = 'heavy intensity drizzle.png';
        } else if (description.includes('heavy intensity rain')) {
            iconFile = 'heavy intensity rain.png';
        } else if (description.includes('heavy intensity shower rain')) {
            iconFile = 'heavy intensity shower rain.png';
        } else if (description.includes('heavy shower rain and drizzle')) {
            iconFile = 'heavy shower rain and drizzle.png';
        } else if (description.includes('heavy shower snow')) {
            iconFile = 'heavy shower snow.png';
        } else if (description.includes('heavy snow')) {
            iconFile = 'heavy snow.png';
        } else if (description.includes('heavy thunderstorm')) {
            iconFile = 'heavy thunderstorm.png';
        } else if (description.includes('light intensity drizzle rain')) {
            iconFile = 'light intensity drizzle rain.png';
        } else if (description.includes('light intensity drizzle')) {
            iconFile = 'light intensity drizzle.png';
        } else if (description.includes('light intensity shower rain')) {
            iconFile = 'light intensity shower rain.png';
        } else if (description.includes('light rain and snow')) {
            iconFile = 'light rain and snow.png';
        } else if (description.includes('light rain')) {
            iconFile = 'light rain.png';
        } else if (description.includes('light shower sleet')) {
            iconFile = 'light shower sleet.png';
        } else if (description.includes('light shower snow')) {
            iconFile = 'light shower snow.png';
        } else if (description.includes('light snow')) {
            iconFile = 'light snow.png';
        } else if (description.includes('light thunderstorm')) {
            iconFile = 'light thunderstorm.png';
        } else if (description.includes('moderate rain')) {
            iconFile = 'moderate rain.png';
        } else if (description.includes('moon')) {
            iconFile = 'moon.png';
        } else if (description.includes('ragged shower rain')) {
            iconFile = 'ragged shower rain.png';
        } else if (description.includes('ragged thunderstorm')) {
            iconFile = 'ragged thunderstorm.png';
        } else if (description.includes('rain and snow')) {
            iconFile = 'rain and snow.png';
        } else if (description.includes('rain')) {
            iconFile = 'rain.png';
        } else if (description.includes('sand:dust whirls')) {
            iconFile = 'sand:dust whirls.png';
        } else if (description.includes('sand')) {
            iconFile = 'sand.png';
        } else if (description.includes('scattered clouds')) {
            iconFile = 'scattered clouds.png';
        } else if (description.includes('shower drizzle')) {
            iconFile = 'shower drizzle.png';
        } else if (description.includes('shower rain and drizzle')) {
            iconFile = 'shower rain and drizzle.png';
        } else if (description.includes('shower rain')) {
            iconFile = 'shower rain.png';
        } else if (description.includes('shower sleet')) {
            iconFile = 'shower sleet.png';
        } else if (description.includes('shower snow')) {
            iconFile = 'shower snow.png';
        } else if (description.includes('sleet')) {
            iconFile = 'sleet.png';
        } else if (description.includes('smoke')) {
            iconFile = 'smoke.png';
        } else if (description.includes('snow')) {
            iconFile = 'snow.png';
        } else if (description.includes('squalls')) {
            iconFile = 'squalls.png';
        } else if (description.includes('thunderstorm with drizzle')) {
            iconFile = 'thunderstorm with drizzle.png';
        } else if (description.includes('thunderstorm with heavy drizzle')) {
            iconFile = 'thunderstorm with heavy drizzle.png';
        } else if (description.includes('thunderstorm with heavy rain')) {
            iconFile = 'thunderstorm with heavy rain.png';
        } else if (description.includes('thunderstorm with light drizzle')) {
            iconFile = 'thunderstorm with light drizzle.png';
        } else if (description.includes('thunderstorm with light rain')) {
            iconFile = 'thunderstorm with light rain.png';
        } else if (description.includes('thunderstorm with rain')) {
            iconFile = 'thunderstorm with rain.png';
        } else if (description.includes('thunderstorm')) {
            iconFile = 'thunderstorm.png';
        } else if (description.includes('tornado')) {
            iconFile = 'tornado.png';
        } else if (description.includes('very heavy rain')) {
            iconFile = 'very heavy rain.png';
        } else if (description.includes('volcanic ash')) {
            iconFile = 'volcanic ash.png';
        } else if (description.includes('overcast clouds')) {
            iconFile = 'overcast clouds.png';
        } else {
        // Default icon if description doesn't match
        iconFile = 'unknown.png';
        }
        // Depending on the time of day, choose the appropriate icon folder
        const timeOfDay = isDayTime() ? 'Day/' : 'Night/';
        return iconPath + timeOfDay + iconFile;
    }
    
    function isDayTime() {
        const now = new Date();
        const hours = now.getHours();
        return hours > 6 && hours < 20; // Assuming day time is between 6 AM to 8 PM
    }
    
    function createHTMLElement(tag, className, text) {
        const element = document.createElement(tag);
        element.classList.add(className);
        element.textContent = text;
        return element;
    }

    function displayErrorMessage(error) {
        weatherResult.textContent = `Error: ${error.message}`;
        weatherResult.classList.remove("hidden");
    }
});
