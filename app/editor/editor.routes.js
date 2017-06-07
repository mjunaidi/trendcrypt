(function() {
  'use strict';

  angular.module('app').config([ '$routeProvider', configureRoutes ]);

  function configureRoutes($routeProvider) {
    $routeProvider.when("/", {
      templateUrl : 'app/editor/edit.html',
      controller : 'EditorController as ctrl',
      resolve : {
        config : function() {
          return {
            'get' : {
              'paths' : {
                'app/editor/editor.json' : null
              },
              'key' : 'init'
            }
          };
        }
      }
    }).otherwise({
      redirectTo : '/'
    });
  }
})();