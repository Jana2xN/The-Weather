document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherResult = document.getElementById("weatherResult");

    weatherForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const city = cityInput.value;
        getGeolocation(city)
            .then(data => {
                const { lat, lng } = data.results[0].geometry;
                weatherResult.textContent = `Geolocation for ${city}: Lat ${lat}, Lng ${lng}`;
            })
            .catch(error => {
                weatherResult.textContent = `Error: ${error.message}`;
            });
    });

    async function getGeolocation(city) {
        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.results.length === 0) {
            throw new Error('Geolocation data not found');
        }

        return data;
    }
});

