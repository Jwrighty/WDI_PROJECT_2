/* global google:ignore */

$(() => {
  var autocomplete = null;
  $('select').material_select();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  if ($('.carousel-item').length > 1) {
    setInterval(function() {
      $('.carousel').carousel('next');
    }, 3000);
  }


  function initialize() {
    var input = document.getElementById('searchName');
    if(input !== null){
      autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fillInDetails();
      });
    }
  }

  function fillInDetails() {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng =  place.geometry.location.lng();
    var placeId = place.place_id;
    $('#name').val(place.name);
    $('#placeId').val(place.place_id);
    $('#latLng').val(`${lat}, ${lng}`);

    return placeId;
  }

  google.maps.event.addDomListener(window, 'load', initialize);


  function initMap() {
    var field = document.getElementById('rest-map');
    if(field !== null){
      var map = new google.maps.Map(document.getElementById('rest-map'), {
        center: {lat: 51.5074, lng: 0.1278},
        zoom: 12
      });

      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      var googlePlaceId = $('#restaurant-details').data('google-place-id');

      service.getDetails({
        placeId: googlePlaceId
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          map.setCenter(place.geometry.location);
          populateShow(place);
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            place.formatted_address + '</div>');
            infowindow.open(map, this);
          });
        }
      });
    }
  }
  function populateShow(place) {
    $('.rating-info').text(place.rating);
    $('.address-info').text(place.formatted_address);
    $('.website-info').html(`<a href="${place.website}">${place.website}</a>`);
    $('.phone-info').text(place.formatted_phone_number);
    $('.shoutout-info').text(`Shout Outs: ${$('.carousel-item').length}`);
  }

  initMap();
});
