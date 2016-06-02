var urlMap = 'https://maps.googleapis.com/maps/api/staticmap?';

if ("geolocation" in navigator) {
  var button = $('#where-am-i');
  button.on('click', getLocation);
} else {
  alert("Geolocation is not available")
}

function getLocation() {
  console.log('Getting location...');
  navigator.geolocation.getCurrentPosition(onLocation, onError, options);
}

var options = {
  enableHighAccuracy: true
};

function onLocation (position) {
  // your code here
  $('#latitude').html('Latitude: ' + position.coords.latitude);
  $('#longitude').html('Longitude: ' + position.coords.longitude);
  displayMap(position.coords.latitude, position.coords.longitude);
}

function onError(error) {
  console.log("Getting location failed: " + error);
}

function displayMap(lat, lon) {
  // your code here
  source = urlMap + 'center=' + lat + ',' + lon + '&size=640x640&zoom=12&key=AIzaSyCsF4KrJw9jhELyUYTqugHkNfHEJlYNR2g';
  $('#placeholder').html('<img src=' + source + ' alt="error">');
}
