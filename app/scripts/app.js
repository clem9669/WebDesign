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
      var lat = coordinates[0];
      var lng = coordinates[1];

      var mymap = L.map('map').setView([lat, lng], 4);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xlbTk2NjYiLCJhIjoiY2poMjRnYTNhMDlkMTJ3cDN0MGNwMnE5NCJ9.pwmUJzWhrwdvFHpe3tk40Q', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2xlbTk2NjYiLCJhIjoiY2poMjRnYTNhMDlkMTJ3cDN0MGNwMnE5NCJ9.pwmUJzWhrwdvFHpe3tk40Q'
      }).addTo(mymap);
      var marker = L.marker([lat,lng]).addTo(mymap);


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
