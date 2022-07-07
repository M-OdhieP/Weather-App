var lat, lang, temp;
$(document).ready(function () {
  getDataWeather();
});

$("#temp_type").click(function () {
  if ($("#temp_type").hasClass("active")) {
    $("#temp_type").removeClass("active").html(" °C");
    $("#temp").html(temp);
  } else {
    $("#temp_type").addClass("active").html(" °F");
    $("#temp").html(cToF(temp));
  }
});

navigator.geolocation.getCurrentPosition(showLocation);

function showLocation(position) {
  lat = position.coords.latitude;
  lang = position.coords.longitude;
}

function getDataWeather() {
  $.ajax({
    url:
      "https://weather-proxy.freecodecamp.rocks/api/current?lat=" +
      lat +
      "&lon=" +
      lang,
    method: "GET",
    dataType: "json",
  }).done(function (data) {
    if (data.error) {
      location.reload();
    }
    console.log(data);

    var weather = data["weather"][0].main;
    var name = data["name"];
    var country = data["sys"].country;
    temp = data["main"].temp;

    $("#location").html(name + ", " + country);
    $("#temp").html(temp);
    $("#temp_type").html(" °C");
    $("#weather").html(weather);

    changeWeather(weather);
  });
}

function cToF(celsius) {
  var cToFahr = (celsius * 9) / 5 + 32;
  return cToFahr;
}

function changeWeather(weather) {
  switch (weather) {
    case "Clouds":
      $("#icon_weather").attr(
        "src",
        "https://cdn-icons-png.flaticon.com/512/2983/2983922.png"
      );
      break;
    case "Rainy":
      $("#icon_weather").attr(
        "src",
        "https://cdn-icons-png.flaticon.com/512/106/106059.png"
      );
      break;
    case "Sunny":
      $("#icon_weather").attr(
        "src",
        "https://uxwing.com/wp-content/themes/uxwing/download/27-weather/day-sunny.png"
      );
      break;
    default:
    // code block
  }
}
