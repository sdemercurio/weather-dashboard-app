$(document).ready(function() {
// SET UP VARIABLES
//=======================================================

// Search Parameters
// Base URL
//  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
//  console.log(queryURL);
// let todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
// let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
let history = [];

// FUNCTIONS
//=======================================================

// Search Button
//=======================================================
$("#search-button").on("click", function() {
    var search = $("#search-city").val();

    $("#search-city").empty();

    getWeather(search);
});
// Display searched cities to toggle back and forth
//=======================================================
$(".history").on("click", "li", function() {
    getWeather($(this).text());
});

function row(city) {
    var li = $("<li>").addClass("list-group-item").text(city);
    $(".history").append(li);
}
// Retrieve weather data
//=======================================================
function getWeather(search) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial",
        dataType: "json",
        success: function(data) {

            console.log("https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial");
            console.log(data);
// Search history
//=======================================================
            if (history.indexOf(search) === -1) {
                history.push(search);
                window.localStorage.setItem("history", JSON.stringify(history));

                row(history);
            }

// Create and append elements to DOM
//=======================================================

            let cityDate = $("<h2>").addClass("city-date").text(data.name + new Date().toLocaleDateString());
            // $("div #today").append("<h2>" + data.name + new Date().toLocaleDateString() + "</h2>"); 
            let temp = $("<p>").text("Current Temperature: " + data.main.temp + "°F");
            let humidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
            let windSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + "MPH");
            // console.log(data.name);
            // console.log(new Date().toLocaleDateString());
            // console.log("temp: " + data.main.temp);
            // console.log("humidity: " + data.main.humidity);
            // console.log("wind speed: " + data.wind.speed);
            $("#today").append(cityDate, temp, humidity, windSpeed);
            
        
            
        }
    })
};






});