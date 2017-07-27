/* global google:ignore */

$(() => {
  let autocomplete = null;
  $('select').material_select();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  if ($('.carousel-item').length > 1) {
    setInterval(function() {
      $('.carousel').carousel('next');
    }, 4000);
  }


  function initialize() {
    const input = document.getElementById('searchName');
    if(input !== null){
      autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fillInDetails();
      });
    }
  }

  function fillInDetails() {
    const place = autocomplete.getPlace();
    const lat = place.geometry.location.lat();
    const lng =  place.geometry.location.lng();
    const placeId = place.place_id;
    $('#name').val(place.name);
    $('#placeId').val(place.place_id);
    $('#latLng').val(`${lat}, ${lng}`);

    return placeId;
  }

  google.maps.event.addDomListener(window, 'load', initialize);


  function initMap() {
    const field = document.getElementById('rest-map');
    if(field !== null){
      const map = new google.maps.Map(document.getElementById('rest-map'), {
        center: {lat: 51.5074, lng: 0.1278},
        zoom: 12
      });

      const infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);
      const googlePlaceId = $('#restaurant-details').data('google-place-id');

      service.getDetails({
        placeId: googlePlaceId
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          map.setCenter(place.geometry.location);
          populateShow(place);
          const marker = new google.maps.Marker({
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

  let indexMap;
  let infowindow;
  function initMapIndex() {
    const latLng = $('.index-img');
    // console.log(latLng);
    const field = document.getElementById('index-map');
    if(field !== null){
      indexMap = new google.maps.Map(document.getElementById('index-map'), {
        center: {lat: 51.515419, lng: -0.141099},
        zoom: 11,
        styles: [
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#f5f5f5'
              }
            ]
          },
          {
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#616161'
              }
            ]
          },
          {
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#f5f5f5'
              }
            ]
          },
          {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#bdbdbd'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#eeeeee'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#757575'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#e5e5e5'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#9e9e9e'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#ffffff'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#757575'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#dadada'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#616161'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#9e9e9e'
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#e5e5e5'
              }
            ]
          },
          {
            'featureType': 'transit.station',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#eeeeee'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#c9c9c9'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#9e9e9e'
              }
            ]
          }
        ]
      });
      loopOverRestaurants(latLng);
    }
  }

  function loopOverRestaurants(latLng) {
    $.each(latLng, (i, info) => {
      var latLang = info.dataset.latlng;
      var restName = $(info).parent().parent().siblings()[0].innerText;
      var id = latLang.split(' ')[2];


      var latitude = parseFloat(latLang.split(', ')[0]);
      var long = parseFloat(latLang.split(', ')[1]);
      addMarkerForRestaurant(latitude, long, restName, id);
    });
  }

  function addMarkerForRestaurant(latitude, long, restaurant, id) {
    const marker = new google.maps.Marker({
      position: {lat: latitude, lng: long},
      map: indexMap
    });
    marker.addListener('click', function() {
      addInfoWindowForMarker(marker, restaurant, id);
    });
  }

  function addInfoWindowForMarker(marker, restaurant, id) {
    if(infowindow) infowindow.close();
    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
      <a href="/restaurants/${id}">
      <p><strong>${restaurant}</strong></p>
      </a>
      </div>
      `
    });

    infowindow.open(indexMap, marker);
  }

  initMap();
  initMapIndex();
});
