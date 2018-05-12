'use strict';

/**
 * @ngdoc overview
 * @name webDesignApp
 * @description
 * # webDesignApp
 *gillesddlk@gmail.com
 * Main module of the application.
 */


angular
  .module('webDesignApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

function searchcity() {

  var txt = document.getElementById("searchcity").elements[0].value;
  document.getElementById("enteredcity").innerHTML = "La ville que vous avez choisie est : " + txt + ".";

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();
  const url_gouv = 'https://api-adresse.data.gouv.fr/search/?q=' + txt; //make a search about the city
  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', url_gouv, true);

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {

      console.log(data.features[0].properties.label);
      console.log(data.features[0].properties.context);
      console.log(data.features[0].properties.postcode);
      console.log(data.features[0].properties.type);
      console.log(data.features[0].geometry.coordinates);
      var coordinates = data.features[0].geometry.coordinates;
      // var lat = coordinates[0];
      // var lng = coordinates[1];

      //table
      var info, text, fLen, i;

      info = [data.features[0].properties.label,data.features[0].properties.context,data.features[0].properties.postcode,data.features[0].properties.type];
      fLen = info.length;
      text = "<ul>";
      for (i = 0; i < fLen; i++) {
        text += "<li>" + info[i] + "</li>";
      }
      text += "</ul>";
      document.getElementById("table").innerHTML = text;

      mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbTk2NjYiLCJhIjoiY2poMjRnYTNhMDlkMTJ3cDN0MGNwMnE5NCJ9.pwmUJzWhrwdvFHpe3tk40Q';
      // Map Street
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        center: coordinates, // starting position [lng, lat]
        zoom: 11 // starting zoom
      });

      //Maps Satelite -- not working 😞
      // var map2 = new mapboxgl.Maps({
      //   container: 'map2',
      //   zoom: 9,
      //   center: coordinates,
      //   style: 'mapbox://styles/mapbox/satellite-v9',
      //   hash: false
      // });

      // ADD a picture as a Marker -- not working 😞
      // map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function(error, image) {
      //   if (error) throw error;
      //   map.addImage('cat', image);
      //   map.addLayer({
      //     "id": "points",
      //     "type": "symbol",
      //     "source": {
      //       "type": "geojson",
      //       "data": {
      //         "type": "FeatureCollection",
      //         "features": [{
      //           "type": "Feature",
      //           "geometry": {
      //             "type": "Point",
      //             "coordinates": [0, 0]
      //           }
      //         }]
      //       }
      //     },
      //     "layout": {
      //       "icon-image": "cat",
      //       "icon-size": 0.25
      //     }
      //   });
      // });


    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  };

  // var request2 = new XMLHttpRequest();
  // const url_maps =
  // Send request
  request.send();
}
