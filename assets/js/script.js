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
              let lat = WeatherData.coord.lat;
              let lon = WeatherData.coord.lon;
              console.log(lat);
              console.log(lon);
              let iconURL = "http://openweathermap.org/img/w/" + WeatherData.weather[0].icon + ".png";
              let cityDate = $("<h2>").addClass("city-date").html(WeatherData.name + " " + new Date().toLocaleDateString() + " <img id='weather-icon' src= " + iconURL + ">");
            //   let icon = $("<img id='weather-icon' src= " + iconURL + " >" + WeatherData.weather[0].icon + "@2x.png");
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


      let uvURL = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + WeatherData.coord.lat + '&lon=' + WeatherData.coord.lon + '&appid=44a6ad4a174b6c522a94ebe5df83deda';
            $.ajax({
                url: uvURL,
                method: 'GET'
            })
                .then(function (WeatherData) {
                    
                    let uvIndex = WeatherData.value;
                    $('#uv-color').text(uvIndex);
                    //Determine which color to display the UV Index
                    if (uvIndex >= 3 && uvIndex < 6) {
                        $('.uv-color').attr("class", "badge badge-yellow");
                    }
                    else if (uvIndex >= 6 && uvIndex < 8) {
                        $('.uv-color').attr("class", "badge badge-orange");
                    }
                    else if (uvIndex >= 8) {
                        $('.uv-color').attr("class", "badge badge-red");
                    }
                    else {
                        $('.uv-color').attr("class", "badge badge-green");
                    }

                    //displays weather card
                    $('#today').append(uvIndex);

                });
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
              
              for (let i = 0; i < WeatherData.list.length; i++) {
                  if (WeatherData.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    
                      let cardDiv = $("<div>").addClass("card col-3-lg");
                      let = iconURL = "http://openweathermap.org/img/w/" + WeatherData.list[i].weather[0].icon + ".png";
                      let cardTitle = $("<h4>").addClass("card-title").html(new Date(WeatherData.list[i].dt_txt).toLocaleDateString());
                      let icon = $("<img id='weather-icon-forecast' src= " + iconURL + ">");
                      let temp = $("<p>").text("Temp: " + WeatherData.list[i].main.temp_max + "°F");
                      let humidity = $("<p>").text("Humidity: " + WeatherData.list[i].main.humidity + "%"); 
// Append card title to the card
                    cardDiv.append(cardTitle, temp, humidity, icon);
                      $("#forecast").append(cardDiv);
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
      // console.log("city " + city);
      // console.log("city 0 " + city[0]);
      // li = $("<li>").addClass("list-group-item").text(city);
      // $(".history").append(li)
  }


});

