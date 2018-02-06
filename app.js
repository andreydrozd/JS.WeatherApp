$(document).ready(function() {
  
  // Why are there "status" and "xhr" parameters in method signature?
  function handleConditionsResponse(response, status, xhr){
    var location = response.current_observation.display_location.full;
      $("#location").html(location);
  
    var updatedTime = response.current_observation.observation_time;
    $("#updated-time").html(updatedTime);
    
    var currentTemp = response.current_observation.temp_f;
    $("#current-temp").html(currentTemp +"&deg;");

    var currentConditionsIcon = response.current_observation.icon_url;
    $("#current-conditions-icon").attr("src", currentConditionsIcon); 
    
    var currentConditions = response.current_observation.weather;
    $("#current-conditions").html(currentConditions);

    var feelsLikeTemp = response.current_observation.feelslike_f;
    $("#feels-like-temp").html("Feels like " + feelsLikeTemp +"&deg;");

    var windInfo = response.current_observation.wind_string;
    $("#wind-conditions").html("<strong>Wind Conditions:</strong> " + windInfo); 
  }

  function handle3DayForecastResponse(response, status, xhr){
    // DOW = Day Of the Week
  
    // Current day's night forecast
    var tonightsForecastText = response.forecast.txt_forecast.forecastday[1].fcttext;
    $("#tonights-forecast").html("<strong>Tonight's Forecast:</strong> " + tonightsForecastText);

    // Day 1 daytime forecast
    var FirstDayDOW = response.forecast.simpleforecast.forecastday[1].date.weekday;
    $("#first-day-dow").html(FirstDayDOW);

    var FirstDayMonth = response.forecast.simpleforecast.forecastday[1].date.monthname_short;
    var FirstDayDay = response.forecast.simpleforecast.forecastday[1].date.day;
    $("#first-day-month-and-date").html(FirstDayMonth + " " + FirstDayDay);

    var FirstDayIcon = response.forecast.simpleforecast.forecastday[1].icon_url;
    $("#first-day-icon").attr("src", FirstDayIcon);


    var FirstDayHi = response.forecast.simpleforecast.forecastday[1].high.fahrenheit;
    var FirstDayLo = response.forecast.simpleforecast.forecastday[1].low.fahrenheit;
    $("#first-day-high-and-low").html(FirstDayHi +"&deg;" +"|"+ FirstDayLo + "&deg;");

    var FirstDayForecastText = response.forecast.txt_forecast.forecastday[2].fcttext;
    $(".text-muted").html(FirstDayForecastText);    
    
    // Day 2 daytime forecast
    var SecondDayDOW = response.forecast.simpleforecast.forecastday[2].date.weekday;
    $("#second-day-dow").html(SecondDayDOW);

    var SecondDayMonth = response.forecast.simpleforecast.forecastday[2].date.monthname_short;
    var SecondDayDay = response.forecast.simpleforecast.forecastday[2].date.day;
    $("#second-day-month-and-date").html(SecondDayMonth + " " + SecondDayDay);

    var SecondDayIcon = response.forecast.simpleforecast.forecastday[2].icon_url;
    $("#second-day-icon").attr("src", SecondDayIcon);

    var SecondDayHi = response.forecast.simpleforecast.forecastday[2].high.fahrenheit;
    var SecondDayLo = response.forecast.simpleforecast.forecastday[2].low.fahrenheit;
    $("#second-day-high-and-low").html(SecondDayHi +"&deg;" +"|"+ SecondDayLo + "&deg;");

    var SecondDayForecastText = response.forecast.txt_forecast.forecastday[4].fcttext;
    
    // Day 3 daytime forecast
    var ThirdDayDOW = response.forecast.simpleforecast.forecastday[3].date.weekday;
    $("#third-day-dow").html(ThirdDayDOW);    

    var ThirdDayMonth = response.forecast.simpleforecast.forecastday[3].date.monthname_short;
    var ThirdDayDay = response.forecast.simpleforecast.forecastday[3].date.day;
    $("#third-day-month-and-date").html(ThirdDayMonth + " " + ThirdDayDay);


    var ThirdDayIcon = response.forecast.simpleforecast.forecastday[3].icon_url;
    $("#third-day-icon").attr("src", ThirdDayIcon);

    var ThirdDayHi = response.forecast.simpleforecast.forecastday[3].high.fahrenheit;
    var ThirdDayLo = response.forecast.simpleforecast.forecastday[3].low.fahrenheit;
    $("#third-day-high-and-low").html(ThirdDayHi +"&deg;" +"|"+ ThirdDayLo + "&deg;");

    var ThirdDayForecastText = response.forecast.txt_forecast.forecastday[6].fcttext;  
  }

  function handlePositionError(error){
    alert("Couldn't access your location.");
  }

  function success(pos){
    var crd = pos.coords;
    var lat = crd.latitude;
    var long = crd.longitude;

    var wundergroundConditions= "http://api.wunderground.com/api/39e08aca79960ac4/conditions/q/"+lat+","+long+".json";
    var wunderground3DayForecast = "http://api.wunderground.com/api/39e08aca79960ac4/forecast/q/"+lat+","+long+".json";

    $.getJSON(wundergroundConditions).then(handleConditionsResponse);
    $.getJSON(wunderground3DayForecast).then(handle3DayForecastResponse);

    $("#upper-half").slideDown("slow");
    $("#lower-half").slideDown("slow");
    $("#btn-container").hide();
  }

  function zipcodeButtonWeather(event){
    var zipcode = $("#zipcode-entry").val();

    var wundergroundConditions= "http://api.wunderground.com/api/39e08aca79960ac4/conditions/q/"+zipcode+".json";
    var wunderground3DayForecast = "http://api.wunderground.com/api/39e08aca79960ac4/forecast/q/"+zipcode+".json";

    $.getJSON(wundergroundConditions, handleConditionsResponse);
    $.getJSON(wunderground3DayForecast, handle3DayForecastResponse);
    
    $("#upper-half").slideDown("slow");
    $("#lower-half").slideDown("slow");
    $("#btn-container").hide();
  }

  function geoLocationWeather(event){
    navigator.geolocation.getCurrentPosition(success, handlePositionError)
  }

  $("#show-weather-zipcode").click(zipcodeButtonWeather);
  $("#show-weather-geolocation").click(geoLocationWeather);

})

// Add Almanac data in later revisions.
/* 
var wundergroundAlmanac = "http://api.wunderground.com/api/39e08aca79960ac4/almanac/q/IL/Chicago.json";

$.getJSON(wundergroundAlmanac, function(data) {
  var normalHigh = data.almanac.temp_high.normal.F;
  console.log("Normal high: " + normalHigh + "\xb0F");
  var normalLow = data.almanac.temp_low.normal.F;
  console.log("Normal low: " + normalLow + "\xb0F");

  var recordHighYear = data.almanac.temp_high.recordyear;
  var recordLowYear = data.almanac.temp_low.recordyear;

  var recordHigh = data.almanac.temp_high.record.F;
  console.log("Record high: " + recordHigh + "\xb0F in " + recordHighYear);
  var recordLow = data.almanac.temp_low.record.F;
  console.log("Record high: " + recordLow + "\xb0F in " + recordLowYear);;
}); */