(function() {
  'use strict';

  angular.module('app.theme').service('themeService', ThemeService);

  ThemeService.$inject = [];

  function ThemeService() {
    this._themes = [ "default", "amelia", "cerulean", "cosmo", "cyborg", "flatly", "journal", "readable", "simplex", "slate", "spacelab", "united", "darkly", "lumen", "paper", "sandstone", "superhero", "yeti" ]; // zero-index

    // retrieve saved theme from localStorage
    /*var savedTheme = this.Storage.loadObject('theme');
    if (savedTheme != undefined && savedTheme != null && savedTheme.length > 0)
      this.theme = savedTheme;*/
  }

  ThemeService.prototype.ie = function(ie) {
    if (ie === true) {
      this._themes = _.without(this._themes, "cerulean", "slate", "spacelab");
    }
  };

  ThemeService.prototype.themes = function() {
    return this._themes;
  };

  ThemeService.prototype.pick = function(ind) {
    var count = this.count();
    if (ind >= count || ind < 0) {
      ind = 0;
    }
    if (count > 0) {
      return this._themes[ind];
    }
  };

  ThemeService.prototype.count = function() {
    return this._themes.length;
  };

})();
