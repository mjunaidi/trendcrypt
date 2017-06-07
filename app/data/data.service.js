(function() {
  'use strict';

  angular.module('app.data').service('dataService', DataService);

  DataService.$inject = [ '$http' ];

  function DataService($http) {
    this._http = $http;
  }

  DataService.prototype.get = function(url) {
    return this._http.get(url).then(_parse);
  };

  DataService.prototype.post = function(url, data, header, token) {
    if (typeof header !== 'undefined' && typeof token !== 'undefined') {
      this._http.defaults.headers.post[header] = token;
    }
    this._http.post(url).then(_parse);
  };

  DataService.prototype.put = function(url, data) {
    this._http.put(url).then(_parse);
  };

  function _parse(response) {
    switch (response.status) {
    case 200:
      return response.data;
    case 204:
      return null;
    default:
      return response;
    }
  }

})();
