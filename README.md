# weather-app
Weather Dash is an application utilizing Open Weather API to retrive weather data and dynamically update HTML.

## Table of contents
* [General info](#general-info)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Demo](#demo)
* [Technologies](#technologies)
* [Status](#status)

## General info.
Upon accessing the applcation, the user is able to search a city and recieve the current weather as well as the 5-Day forecast. Each serached city appears beneath the search window, allowing the user to toggle between cities to compare weather.
```
The current weeather displays the temperature, humidity, and wind speed, and is accompanied by a weather icon reflecting the current conditions.
```
The 5-day forecast features the date, temperature, humidity, and weather icon.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast

## Demo
![weather_dash](https://user-images.githubusercontent.com/73494343/104851355-8567bc80-58c2-11eb-8905-a7fcb92c6f4c.gif)

## Technologies
* Bootstrap 4
* Javascript
* Open Weather Map API

## Status
Project is: _in progress_
I realize I do not have the UV index included. This is something I will remedy in the next week.

Link to deployed page: https://sdemercurio.github.io/weather-app/
