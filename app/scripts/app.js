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


function showdiv() {
  var menumap = document.getElementById("Mapmode"); // display menu map
  if (menumap.style.display === "none") {
    menumap.style.display = "block";
  } else {
    menumap.style.display = "none";
  }
}

function capitalizeFirstLetter(string) { //Capitalize the first letter of a string
  //  return string.charAt(0).toUpperCase() + string.slice(1);
  return string[0].toUpperCase() + string.slice(1);
}

function searchcity() {
  var txt = document.getElementById("searchcity").elements[0].value; // get text from input
  if (txt == "") {
    alert("City must be filled out"); // alert to fill in field
    return false;
  }
  var txt = capitalizeFirstLetter(txt); // use fct to capitalize
  document.getElementById("enteredcity").innerHTML = " La ville que vous avez choisie est : " + txt + ".";
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest(); // setup the request
  const url_gouv = 'https://api-adresse.data.gouv.fr/search/?q=' + txt; //make a search about the city on gouv API
  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', url_gouv, true);

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) { // handle the response from the url

      var coordinates = data.features[0].geometry.coordinates;

      // var lat = coordinates[0];
      // var lng = coordinates[1];

      // document.getElementById("tours").innerHTML = "Voici des précisions sur la ville : "

      //table
      var info, text, fLen, i;

      info = [data.features[0].properties.label, data.features[0].properties.context, data.features[0].properties.postcode, data.features[0].geometry.coordinates];
      fLen = info.length;
      text = "<ul>";
      for (i = 0; i < fLen; i++) {
        text += "<li>" + info[i] + "</li>";
      }
      text += "</ul>";
      document.getElementById("table").innerHTML = text; // sent responses to table as a list

      mapboxgl.accessToken = 'pk.XXXXXXXXXXXXXXXXXXXXXXXXXXXMGNwMnE5NCJ9.pwmUJzWhrwdvFHpe3tk40Q';

      // Map Street
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/basic-v9',
        zoom: 13, // zoom on the map
        center: coordinates // according to the previous api !
      });

      // add an image as marker
      map.on('load', function() {
        map.loadImage('../images/you-are-here.png', function(error, image) {
          if (error) throw error;
          map.addImage('you-are-here', image);
          map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": coordinates
                  }
                }]
              }
            },
            "layout": {
              "icon-image": "you-are-here",
              "icon-size": 0.08 // icon size displayed on map
            }
          });
        });
      });

      var layerList = document.getElementById('menu');
      var inputs = layerList.getElementsByTagName('input');

      function switchLayer(layer) { // permit to change layer on map
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
      }

      for (var i = 0; i < inputs.length; i++) { //increment switch layer
        inputs[i].onclick = switchLayer;
      }

    } else {
      const errorMessage = document.createElement('marquee'); // if api response =! 200 then display errorMessage
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  };


  // The following section was a draft for retrieving the weather data about the pointed localisation by api and a short description about the entered city.

  // var request2 = new XMLHttpRequest();
  // better one === const url_weather2 = 'http://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22';
  // //const url_wiki = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + txt;
  // request.open('GET', url_weather2, true);
  //
  // request.onload = function2() {
  //   var data2 = JSON.parse(this.response);
  //
  //   if (request2.status >= 200 && request2.status < 400) {
  //     // $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=" + q, function(data){
  //     console.log(data2.main.temp);
  //
  //
  //   } else {
  //     const errorMessage = document.createElement('marquee');
  //     errorMessage.textContent = `Gah, it's not working!`;
  //     app.appendChild(errorMessage);
  //   }
  // };


  // Send request
  request.send();

}
