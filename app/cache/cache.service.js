(function() {
  'use strict';

  angular.module('app.cache').service('cacheService', CacheService);

  CacheService.$inject = [];

  var TIMEOUT = 300000;
  var LIMIT = 10;

  function CacheService() {
    this._data = {};
    this.count = 0;
  }

  CacheService.prototype.put = function(key, data) {
    this._data[key] = {
      time : Date.now(),
      value : data
    };
    this.count++;
    if (this.count > LIMIT) {
      for ( var i in this._data) {
        delete this._data[i];
        this.count--;
        break;
      }
    }
  };

  CacheService.prototype.get = function(key) {
    var cache = this._data[key];
    if (typeof cache !== 'undefined') {
      var time = cache.time;
      if (typeof cache.time === 'number') {
        var diff = Date.now() - cache.time;
        if (diff <= TIMEOUT) {
          return cache.value;
        }
      }
    }
    return null;
  };

})();
