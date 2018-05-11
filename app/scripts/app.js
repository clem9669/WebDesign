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
  const url_gouv = 'https://api-adresse.data.gouv.fr/search/?q='+txt; //make a search about the city
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


    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  };

  // Send request
  request.send();
}

//Maps
var map;
var uluru = {
  lat: 47.3220, //getlat
  lng: 5.0415 //getlng
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13, //zoom sur la map
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
