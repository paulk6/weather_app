import Config from '../../config.js';


let config = new Config()

let API_KEY = config.getKey();

// create a callback function that inserts the response into the nav div
function grabNav(response) {
  $('header').html(response);
}

// use the .get() method to call the header.html component
$.get('./components/header.html', grabNav);


// create a function for the form when submitted
$('#submit-btn').click(function(e) {
  // preventDefault prevents it from refreshing the page when you submit the form
  e.preventDefault();
  let city = $('#city_search').val();

  // make the header for the info section the city value
  $('#city_name').text(city);


// # is looking for element with that id, without # it's looking for all elements with that name

  // store url for call
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`

  // use jquery to send a call for the current weather data
  $.get(url, function(response) {
    console.log(response);

    // returns the response from the API with the name and country correlated to the name you put in
    $('#city_name').text(`${response.name}, ${response.sys.country}`)
    $('#high').html(`${response.main.temp_max}&#8457`)
    $('#low').html(`${response.main.temp_min}&#8457`)
    $('#forecast').text(`${response.weather[0].description}`)
    $('#humidity').text(`${response.main.humidity}%`)
  });

  // show the weather info cards
  $('#weather-info').css('display', 'block')
});

// hide the weather-info section immediately on load
$('#weather-info').css('display', 'none')
