var now = new Date();
var hour = now.getHours();

function greeting(x) {
    var greet = document.getElementById("greeting");
    if (greet) {
        if (x < 5 || x >= 20) {
            greet.innerHTML = "Good night, Welcome to MonoMuse!";
        } else if (x < 12) {
            greet.innerHTML = "Good morning, Welcome to MonoMuse!";
        } else if (x < 18) {
            greet.innerHTML = "Good afternoon, Welcome to MonoMuse!";
        } else {
            greet.innerHTML = "Good evening, Welcome to MonoMuse!";
        }
    }
}

greeting(hour);


function addYear(x) {
    var curr_year = new Date().getFullYear();
    var message = document.getElementById("copyYear");

    message.innerHTML = "&copy; " + curr_year + " MonoMuse. All rights reserved."
}

function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}
ActiveNav();

$(document).ready(function() {
    $("#readMore").click(function() {
        $("#longIntro").show();
        $("#readLess").show();
        $("#readMore").hide();
    });

    $("#readLess").click(function() {
        $("#longIntro").hide();
        $("#readLess").hide();
        $("#readMore").show();
    });
});

function showForm(date) {
    // Convert "April 5, 2026" to YYYY-MM-DD for the date input
    var d = new Date(date);
    var formatted = d.toISOString().split("T")[0];
    sessionStorage.setItem("checkoutDate", formatted);
    window.location.href = "checkout.html";
}

function toggleMenu() {
    var nav = document.querySelector(".nav_bar");
    nav.classList.toggle("responsive");
}

function fetchWeather() {
    var weatherEl = document.getElementById("weather");
    if (!weatherEl) return;

    var weatherCodes = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Foggy", 48: "Icy fog",
        51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle",
        61: "Light rain", 63: "Rain", 65: "Heavy rain",
        71: "Light snow", 73: "Snow", 75: "Heavy snow",
        80: "Rain showers", 81: "Rain showers", 82: "Heavy rain showers",
        95: "Thunderstorm"
    };

    fetch("https://api.open-meteo.com/v1/forecast?latitude=40.4433&longitude=-79.9436&current=temperature_2m,weather_code&temperature_unit=fahrenheit")
        .then(function(response) { return response.json(); })
        .then(function(data) {
            var temp = data.current.temperature_2m;
            var code = data.current.weather_code;
            var condition = weatherCodes[code] || "Unknown";
            weatherEl.innerHTML = "Current weather at MonoMuse: " + condition + ", " + temp + "&deg;F";
        })
        .catch(function() {
            weatherEl.innerHTML = "Weather data unavailable.";
        });
}

fetchWeather();

if (document.getElementById("map")) {
    var map = L.map("map").setView([40.4433, -79.9436], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    }).addTo(map);
    L.marker([40.4433, -79.9436]).addTo(map)
        .bindPopup("MonoMuse Museum")
        .openPopup();
}
