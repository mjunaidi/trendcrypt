(function() {
  'use strict';
  angular.module('app.editor').service('editorService', EditorService);
  EditorService.$inject = [ '$http' ];
  function EditorService($http) {
    this._http = $http;
  }
})();