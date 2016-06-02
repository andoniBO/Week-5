var urlBase = 'https://api.spotify.com/v1/search';

$( document ).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: urlBase,
      data: {
        type: 'track',
        query: $('#trackName').val()
      },
      success: handleTracks,
      error: function() {
        console.log('MAL');
      },
      datatype: 'json'
    })
  });

  function handleTracks(tracks) {
    console.log('found track');
    $('.js-track').html(trackToHTML(tracks.tracks.items[0]));
  }

  function trackToHTML(track) {
    $('.js-title').text(track.name);
    $('.js-author').text(track.artists[0].name);
    $('.js-cover').attr('src',track.album.images[0].url);
    $('.js-player').attr('src',track.preview_url);
  }

  $('.js-btn-play').on('click', function() {
    if($('.js-btn-play').hasClass('playing')) {
      console.log('pausing audio');
      $('.js-player').trigger('pause');
    } else {
      console.log('playing audio');
      $('audio').trigger('play');
    }
    $('.js-btn-play').toggleClass('playing');
  });

  $('.js-btn-play').toggleClass('disabled');
  console.log("play button ready");

  $('.js-player').on('timeupdate', printTime);

  function printTime () {
    var current = $('.js-player').prop('currentTime');
    console.debug('Current time: ' + current);
    $('.js-progress-bar').attr('value', current);
  }

  $('.js-author').on('click', function() {
    console.log("clicking on author");
    $.ajax({
      url: urlBase,
      data: {
        type: 'artist',
        query: $('.js-author').text()
      },
      success: handleAuthor,
      error: function() {
        console.log('MAL');
      },
      datatype: 'json'
    })
  });

  function handleAuthor(author) {
    console.log("search worked!");
    $('.js-author').html(artistToHTML(author.artists.items[0]));
  }

  function artistToHTML(author) {
    $('.js-modal-header').text(' ' + author.name);
    if (author.images.length > 0){
      $('.js-modal-body').append('<img src="' + author.images[0].url + '" alt="image" width="200px">');
    } else {
      $('.js-modal-body').append('<img src="https://image.freepik.com/vector-gratis/musico-que-toca-la-trompeta_91-9699.jpg" alt="image" width="200px">');
    }
    $('.js-modal-body')
    $('.modal').modal('show');
  }
});
