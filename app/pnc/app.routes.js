(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', '$locationProvider', configureRoutes ]);

  function configureRoutes($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl : 'app/pnc/html/home.html'
    }).when("/try", {
      templateUrl : 'app/pnc/html/edit.html'
    }).when("/enc", {
      templateUrl : 'app/pnc/html/enc.html'
    }).when("/dec", {
      templateUrl : 'app/pnc/html/dec.html'
    }).when("/uuid", {
      templateUrl : 'app/pnc/html/uuid.html'
    }).when("/exp", {
      templateUrl : 'app/pnc/html/exp.html'
    }).otherwise({
      redirectTo : '/'
    });
    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  }
})();
