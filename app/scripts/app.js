'use strict';

/**
 * @ngdoc overview
 * @name webDesignApp
 * @description
 * # webDesignApp
 *
 * Main module of the application.
 */
angular
  .module('webDesignApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
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
