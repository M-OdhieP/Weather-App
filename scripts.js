var lat, lon, temp;
$(document).ready(function () {
  // getDataWeather();
  getData(lat, lon);
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
  lon = position.coords.longitude;
}

function getData(lat, lon) {
  // var params = {
  //   lat,
  //   lon,
  // };

  var url = "https://weather-proxy.freecodecamp.rocks/api/current?";
  url += "lat=" + lat;
  url += "&lon=" + lon;

  // Object.keys(params).forEach(function (key) {
  //   url += key + "=" + params[key] + "&";
  // });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
    })
    .catch(function (error) {
      console.log(error);
    });
}

// function getDataWeather() {
//   $.ajax({
//     url:
//       "https://weather-proxy.freecodecamp.rocks/api/current?lat=" +
//       lat +
//       "&lon=" +
//       lon,
//     method: "GET",
//     dataType: "json",
//   }).done(function (data) {
//     if (data.error) {
//       setTimeout(location.reload(), 4000);
//     }
//     console.log(data);

//     var weather = data["weather"][0].main;
//     var name = data["name"];
//     var country = data["sys"].country;
//     temp = data["main"].temp;

//     $("#location").html(name + ", " + country);
//     $("#temp").html(temp);
//     $("#temp_type").html(" °C");
//     $("#weather").html(weather);

//     changeWeather(weather);
//   });
// }

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
