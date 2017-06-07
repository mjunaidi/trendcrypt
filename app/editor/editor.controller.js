(function() {
  'use strict';

  angular.module('app.editor').controller('EditorController', EditorController);
  EditorController.$inject = [];
  function EditorController() {
    this.model = {};
    this.builder = this.entries(this.model);

    this.PRIMITIVE = 'primitive';
    this.ARRAY = 'array';
    this.OBJECT = 'object';
  }

  EditorController.prototype.add = function(key, value, arr) {
    var entry = {
      'key' : key,
      'value' : value,
      'type' : this.PRIMITIVE
    };
    arr.push(entry);
  };

  EditorController.prototype.changeType = function(entry, type) {
    entry.type = type;
  };

  EditorController.prototype.entries = function(model) {
    var arr = [];
    if (typeof model === 'object') {
      for ( var key in model) {
        this.add(key, model(key), arr);
      }
    }
    return arr;
  };

  EditorController.prototype.build = function() {
    var arr = this.builder;
    var model = {};
    for ( var key in arr) {
      var entry = arr[key];
      model[entry.key] = entry.value;
    }
    this.model = model;
  };

})();
