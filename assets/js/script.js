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


$("#search-button").on("click", function() {
    var search = $("#search-city").val();

    getWeather(search);
});

$(".history").on("click", "li", function() {
    getWeather($(this).text());
});

function row(history) {
    var li = $("<li>").addClass("list-group-item list-group-action").text(history);
    $(".history").append(li);
}

function getWeather(search) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial",
        dataType: "json",
        success: function(data) {

            console.log("https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial");
            console.log(data);

            if (history.indexOf(search) === -1) {
                history.push(search);
                window.localStorage.setItem("history", JSON.stringify(history));

                row(history);
            }
        }
    })
}


// 1. Retrive user input, convert into variables
// 2. Use variables to run an AJAX call to Open Weather
// 3. Break down the Open Weather Object into usable fields. 
// 4. Dynamically generate HTML content

// 5. Deal with "edge cases".

});