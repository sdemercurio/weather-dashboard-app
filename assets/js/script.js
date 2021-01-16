$(document).ready(function () {
  // Search Parameters
  // Base URL
  //  let queryURL = "https://api.openweathermap.org/WeatherData/2.5/forecast?q=" + citySearch + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
  //  console.log(queryURL);
  // let todayURL = "https://api.openweathermap.org/WeatherData/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
  // let forecastURL = "https://api.openweathermap.org/WeatherData/2.5/forecast?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial";
  let history = [];

  // FUNCTIONS
  //=======================================================

  // Retrieve weather WeatherData
  //=======================================================
  function getWeather(search) {
      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial",
          WeatherDataType: "json",
          success: function (WeatherData) {

              console.log("https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial");
              console.log(WeatherData);
              // Search history
              //=======================================================
              if (history.indexOf(search) === -1) {
                  history.push(search);
                  window.localStorage.setItem("history", JSON.stringify(history));

                  row(history);
              }

              // Create and append elements to DOM
              //=======================================================
              $("#today").html("");
              let cityDate = $("<h2>").addClass("city-date").text(WeatherData.name + " " + new Date().toLocaleDateString());
              // $("div #today").append("<h2>" + WeatherData.name + new Date().toLocaleDateString() + "</h2>"); 
              let temp = $("<p>").text("Current Temperature: " + WeatherData.main.temp + "°F");
              let humidity = $("<p>").text("Humidity: " + WeatherData.main.humidity + "%");
              let windSpeed = $("<p>").text("Wind Speed: " + WeatherData.wind.speed + "MPH");
              // console.log(WeatherData.name);
              // console.log(new Date().toLocaleDateString());
              // console.log("temp: " + WeatherData.main.temp);
              // console.log("humidity: " + WeatherData.main.humidity);
              // console.log("wind speed: " + WeatherData.wind.speed);
              $("#today").append(cityDate, temp, humidity, windSpeed);
              $("#today").append("<hr>");

          }
      })
  };
  // Search Button
  //=======================================================
  function getForecast(search) {
      $.ajax({
          type: "GET",
          url: "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=44a6ad4a174b6c522a94ebe5df83deda&units=imperial",
          WeatherDataType: "json",
          success: function (WeatherData) {
              console.log(WeatherData);
              $("#forecast").html("");
              $("#forecast").append("<h2>5-Day Forecast:<h2>");
              for (let i = 0; i < WeatherData.length; i++) {
                  if (WeatherData[0].list[i].dt_text.indexOf("15:00:00") !== -1) {
                      let forecastDiv = $("<div>").addClass("card");
                      let cardTitle = $("<h3>").addClass("card-title");

                      $("forecast").append(forecastDiv, cardTitle);
                  }
              }
          }
      });
  };


  // Search Button
  //=======================================================
  $("#search-button").on("click", function () {
      let search = ""
      search = $("#search-city").val();
      // var search = $("#search-city").val(); this is your old code

      $("#search-city").empty();

      getWeather(search);
      getForecast(search);
  });
  // Display searched cities to toggle back and forth
  //=======================================================
  $(".history").on("click", "li", function () {
      getWeather($(this).text());
  });

  function row(city) {
      $(".history").html("");
      let li = ""
      for (let i = 0; i < city.length; i++) {
          li = $("<li>").addClass("list-group-item").text(city[i]);
          $(".history").append(li);
      }
      console.log("city " + city);
      console.log("city 0 " + city[0]);
      // li = $("<li>").addClass("list-group-item").text(city);
      // $(".history").append(li);



  }

});

