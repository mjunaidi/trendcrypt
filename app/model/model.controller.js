(function() {
  'use strict';

  angular.module('app.model').controller('ModelController', ModelController);

  ModelController.$inject = [ 'modelService', 'config' ];

  function ModelController(modelService, config) {
    this._modelService = modelService;
    this._modelService.init(this, config);
  }

})();
