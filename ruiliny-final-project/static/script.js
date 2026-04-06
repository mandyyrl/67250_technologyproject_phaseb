/*  Libraries used:
 *   jQuery 4.0.0 - https://jquery.com/
 *   Leaflet 1.9.4 - https://leafletjs.com/
 *   Open-Meteo API - https://open-meteo.com/
 *   OpenStreetMap - https://www.openstreetmap.org
 */

// Demonstrate greeting based on the time of day
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

// put the current year in the footer copyright
function addYear(x) {
    var curr_year = new Date().getFullYear();
    var message = document.getElementById("copyYear");
    message.innerHTML = "&copy; " + curr_year + " MonoMuse. All rights reserved."
}

// highlight the current page's nav link
function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}
ActiveNav();

// read more / read less toggle on home page (uses jQuery)
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

// when user clicks Buy Now on tickets page, save the date and go to checkout
function showForm(date) {
    var d = new Date(date);
    var formatted = d.toISOString().split("T")[0];
    sessionStorage.setItem("checkoutDate", formatted);
    window.location.href = "checkout.html";
}

// image slideshow on home page
var currentSlide = 0;

function changeSlide(direction) {
    var slides = document.querySelectorAll(".slide");
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    document.getElementById("slideCounter").textContent = (currentSlide + 1) + " / " + slides.length;
}

// hamburger menu toggle for mobile
function toggleMenu() {
    var nav = document.querySelector(".nav_bar");
    nav.classList.toggle("responsive");
}

// uses CMU coordinates (40.4433, -79.9436) as the museum location
// https://open-meteo.com/en/docs
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
            weatherEl.innerHTML = "Current weather at MonoMuse: " + condition + ", <span style='color:#07A0C3'>" + temp + "&deg;F</span>";
        })
        .catch(function() {
            weatherEl.innerHTML = "Weather data unavailable.";
        });
}

fetchWeather();

// Leaflet 1.9.4 - https://leafletjs.com/
// Map tiles from OpenStreetMap - https://www.openstreetmap.org/copyright
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