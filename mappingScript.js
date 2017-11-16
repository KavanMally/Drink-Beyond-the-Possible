      var map;
      var infowindow;
      var directionsService;
      var directionsDisplay;
      var centerCords = {lat: 41.514, lng: -81.606};

      //FIX THESE VARIABLES SO THEY ARE DECLARED IN A FUNCTION

     /* function calculateZoomRadius(){
      	document.getElementById('radius').value;

      	// min zoom 
      	// max zoom 16

      }*/

      function initMap() {
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer;

        map = new google.maps.Map(document.getElementById('map'), {
          center: centerCords,
          zoom: 12
        });
        directionsDisplay.setMap(map);

        //----------------------------------------------------------------
                if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            centerCords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(centerCords);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      //-------------------------------------------------------------------------------

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: centerCords,
          radius: document.getElementById('radius').value,
          type: ['liquor_store']
        }, callback);
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay, start, finish) {
        directionsService.route({
          origin: start,
          destination: finish,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions could not be produced because ' + status);
          }
        });
        alert(finish.address);
		document.getElementById("OK").innerHTML = 
		'<button onclick="routeSelected()">Select this Route</button>';
      }
	 //onclick="secondFunction()"

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        //var placeLoc = place.geometry.location; might not be neccesary
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });

       google.maps.event.addListener(marker, 'click', function(){
       calculateAndDisplayRoute(directionsService, directionsDisplay, centerCords, place.geometry.location)}); // can set visibility to false, try to make it so it does directions when you select 
      }

      // -----------------------------------------------------------



           /* function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }*/