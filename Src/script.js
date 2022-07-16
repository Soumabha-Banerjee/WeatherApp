let weather = {
    apiKey : "8035e9e67618c335d38f0f7f082aac34",

    displayWeather : (data) => {
        const { name } = data; //Using 2nd bracket find out the match name.Suppose here data is the entire object from that { name } find out only the "name" field from data.
        const { icon, description } = data.weather[0]; // Similerly { icon, description } only extract the "icon" and "description" from data.weather[0].
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    
    fetchWeather : function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) =>  response.json() )
        .then((data) => this.displayWeather(data))
        .catch(function(e) {
            alert("No weather found.");
        });
    },

    search : function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".btn").addEventListener("click", () => {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Kolkata");