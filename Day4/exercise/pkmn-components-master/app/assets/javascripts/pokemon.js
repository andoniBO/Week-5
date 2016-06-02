// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
urlBasic = 'http://pokeapi.co';

PokemonApp.Pokemon = function(pokemonUri) {
  this.id = this.idFromURI(pokemonUri);
};

PokemonApp.Pokemon.prototype.render = function() {
  console.log('Rendering pokemon: #' + this.id);
};

PokemonApp.Pokemon.prototype.idFromURI = function(pokemonUri) {
  var uriSegments = pokemonUri.split('/');
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
};

$(document).on('ready', function() {
  $('.js-show-pokemon').on('click', function(event){
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data('pokemon-uri');

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });
});

PokemonApp.Pokemon.prototype.render = function() {
  console.log("Rendering pokemon: #" + this.id);

  var self = this;

  $.ajax({
    url: "/api/pokemon/" + this.id,
    success: function (response) {
      self.info = response;

      console.log("Pokemon name: " + self.info.name);
      console.log("Pokemon number: " + self.info.pkdx_id);
      console.log("Pokemon height: " + self.info.height);
      console.log("Pokemon weight: " + self.info.weight);
      /*var image = */self.renderImage(self.info.sprites[0].resource_uri);
      //console.log("Pokemon image: " + image);
      //console.log(response);

      $(".js-pkmn-name").text(self.info.name);
      $(".js-pkmn-number").text(self.info.pkdx_id);
      $(".js-pkmn-height").text(self.info.height);
      $(".js-pkmn-weight").text(self.info.weight);

      $(".js-pokemon-modal").modal("show");
    },
    error: function() {
      console.log("No hemos podido recuperar la imagen");
    }
  });
};

PokemonApp.Pokemon.prototype.renderImage = function(uri) {
  console.log("Requesting image");

  var self = this;

  $.ajax({
    url: uri,
    success: function(response) {
      self.info = response;
      console.log("Pokemon image: " + self.info.image);
      $('.js-pkmn-image').html('<img src=' + urlBasic + self.info.image + ' alt="pokemon">');
    },
    error: function() {
      console.log("No hemos podido recuperar la imagen");
    }
  });
};
