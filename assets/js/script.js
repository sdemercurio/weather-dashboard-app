$(document).ready(function() {
// SET UP VARIABLES
//=======================================================

// Search Parameters
// Base URL
//  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
//  console.log(queryURL);

// VARIABLE FOR FORECAST
let dayForecast = 0;
// FUNCTIONS
//=======================================================


$("#search-button").click(function() {
    var citySearch = $('#search-city').val();

    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(WeatherData){
        console.log(WeatherData);
    })

})

// MAIN PROCESS
//=======================================================



// 1. Retrive user input, convert into variables
// 2. Use variables to run an AJAX call to Open Weather
// 3. Break down the Open Weather Object into usable fields. 
// 4. Dynamically generate HTML content

// 5. Deal with "edge cases".

});