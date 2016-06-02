var map;

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position) {
  // We can't just directly feed the position into our google map
  // The objects are formatted differently, google maps is looking for
  // an object with "lat" and "lng" keys.
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  setupAutocomplete();
};

function onError(err){
  console.log("What are you using, IE 7??", err);
};

function createMap(position){
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 17
  });
  createMarker(position);
  createMarker({lat: 40.4368861,lng: -3.6801592});
};

function createMarker(position/*,address*/) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  saveInLocalStorage(position/*,address*/);
  var contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h1 id="firstHeading" class="firstHeading">o.O</h1>'+
                        '<div id="bodyContent">'+
                          '<p>' + 'address' + '</p>'+
                        '</div>'+
                      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: /*address*/contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
};

function setupAutocomplete() {
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
      createMarker(place.geometry.location/*,place.formatted_address*/);
    } else {
      alert("The place has no location...?");
    }
    //console.log(place);
  });
};

function loadLocalStorage() {
  return JSON.parse(localStorage.getItem('itemsArray')) || [];
  var positions = loadLocalStorage();
  positions.forEach(function(item,index,array) {
    createMarker(item.position/*,item.address*/);
  })
};

function saveInLocalStorage(position/*,address*/) {
  var storedPositions = JSON.parse(localStorage.getItem('itemsArray')) || [];

  storedPositions.push({position: position/*, address: address*/});

  localStorage.setItem('itemsArray', JSON.stringify(storedPositions));
};
