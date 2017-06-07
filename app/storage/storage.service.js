(function() {
  'use strict';

  angular.module('app.storage').service('storageService', StorageService);

  StorageService.$inject = [];

  function StorageService() {
  }

  StorageService.prototype.loadObject = function(key) {
    // variable to hold date found in local storage
    var data = [];
    // retrieve json data from local storage for key
    var obj = localStorage[key];
    // if data was found in local storage convert to object
    if (obj) {
      try {
        data = JSON.parse(obj);
      } catch (err) {
        console.log('loadObject -> err -> ');
        console.log(err);
        console.log('key -> ' + key);
        console.log('stored value -> ');
        console.log(JSON.stringify(obj));
      }
    }
    return data;
  };

  StorageService.prototype.clear = function() {
    localStorage.clear();
  };

  StorageService.prototype.supported = function() {
    return 'localStorage' in window && window['localStorage'] !== null;
  };

  StorageService.prototype.saveObject = function(obj, key) {
    // Save object to local storage under key
    localStorage[key] = JSON.stringify(obj);
  };

  StorageService.prototype.guid = function() {
    return guid();
  };

})();
