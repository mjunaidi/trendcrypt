(function() {
  'use strict';

  angular.module('app.model').service('modelService', ModelService);

  ModelService.$inject = [ 'dataService', 'cacheService' ];

  function ModelService(dataService, cacheService) {
    this._dataService = dataService;
    this._cacheService = cacheService;
    this._watchers = {};
  }

  ModelService.prototype.init = function(ctrl, config) {
    if (typeof config !== 'undefined' && config !== null) {
      if (typeof config === 'object') {
        for ( var i in config) {
          if (typeof ctrl[i] === 'function') {
            ctrl[i].call(ctrl, config[i]);
          } else if (typeof this[i] === 'function') {
            this[i].call(this, ctrl, config[i]);
          } else if (typeof ctrl[i] === 'undefined') {
            ctrl[i] = config[i];
            this.watch(ctrl, i);
          }
        }
      }
    }
  };

  ModelService.prototype.get = function(ctrl, args) {
    if (typeof args === 'object') {
      if (args instanceof Array) {
        for ( var i in args) {
          this.get(ctrl, args[i]);
        }
        return;
      }
      var paths = args.paths;
      if (paths) {
        var url = '';
        var proceed = true;
        var keys = [];
        var watchKey = '';
        for ( var i in paths) {
          var path = paths[i];
          if (typeof path !== 'undefined' && path !== null) {
            if (typeof path === 'object') {
              var val = ctrl[path.key];
              if (typeof val === 'undefined') {
                proceed = false;
              } else {
                var attr = path.attr;
                if (typeof attr !== 'undefined') {
                  val = val[attr];
                }
                url += '/' + val;
              }
              keys.push(path.key);
              watchKey += '/' + path.key;
            } else {
              url += '/' + path;
              watchKey += '/' + path;
            }
          }
        }
        if (keys.length > 0) {
          this.watch(ctrl, keys, watchKey, (function() {
            this.get(ctrl, args);
          }).bind(this));
        }
        if (url.length > 0 && proceed === true) {
          // use cache if available
          var self = this;
          var index = args.index;
          var key = args.key;
          var cache = this._cacheService.get(url);
          if (cache !== null) {
            var data = cache;
            if (typeof index !== 'undefined') {
              if (data instanceof Array && data.length > 0) {
                data = data[index];
              }
            }
            if (typeof key !== 'undefined') {
              if (typeof ctrl[key] === 'function') {
                ctrl[key].call(ctrl, data);
              } else if (typeof this[key] === 'function') {
                this[key].call(this, ctrl, data);
              } else {
                ctrl[key] = data;
                this.watch(ctrl, key);
              }
            }
            return;
          }
          this._dataService.get(url).then(function(data) {
            self._cacheService.put(url, data);
            if (typeof index !== 'undefined') {
              if (data instanceof Array && data.length > 0) {
                data = data[index];
              }
            }
            if (typeof key !== 'undefined') {
              if (typeof ctrl[key] === 'function') {
                ctrl[key].call(ctrl, data);
              } else if (typeof this[key] === 'function') {
                this[key].call(this, ctrl, data);
              } else {
                ctrl[key] = data;
                this.watch(ctrl, key);
              }
            }
          }.bind(this));
        }
      }
    }
  };

  ModelService.prototype.watch = function(ctrl, keys, key, fn) {
    if (typeof ctrl._watchers === 'undefined') {
      ctrl._watchers = {};
    }
    // register watcher
    if (typeof fn !== 'undefined') {
      if (typeof ctrl._watchers[key] === 'undefined') {
        ctrl._watchers[key] = {};
      }
      ctrl._watchers[key].keys = keys;
      ctrl._watchers[key].fn = fn;
    } else {
      for ( var a in ctrl._watchers) {
        var watcher = ctrl._watchers[a];
        var watcherKeys = watcher.keys;
        var found = false;
        if (keys instanceof Array) {
          for ( var i in keys) {
            var k = keys[i];
            for ( var j in watcherKeys) {
              if (k === watcherKeys[j]) {
                found = true;
                break;
              }
            }
          }
        } else {
          for ( var j in watcherKeys) {
            if (keys === watcherKeys[j]) {
              found = true;
              break;
            }
          }
        }
        if (found === true) {
          var fn = watcher.fn;
          if (typeof fn === 'function') {
            fn.call(ctrl);
          }
        }
      }
    }
  };

  /*ModelService.prototype.watch = function(ctrl, key, fn, ind) {
    if (typeof ctrl._watchers === 'undefined') {
      ctrl._watchers = {};
    }
    if (typeof fn !== 'undefined') {
      if (typeof ctrl._watchers[key] === 'undefined') {
        ctrl._watchers[key] = {};
      }
      if (typeof ind === 'undefined') {
        ind = '0';
      }
      ctrl._watchers[key][ind] = fn;
    } else {
      var fns = ctrl._watchers[key];
      if (typeof fns === 'object') {
        for ( var i in fns) {
          fns[i].call(ctrl);
        }
      }
    }
  };

  ModelService.prototype.exec = function(ctrl, key, args) {
    if (typeof ctrl[key] === 'function') {
      ctrl[key].call(ctrl, args);
    } else if (typeof this[key] === 'undefined') {
      this.watch(ctrl, key, (function() {
        this.exec(ctrl, key, args);
      }).bind(this), 'exec');
    } else {
      var fn = eval('ctrl.' + key + "=" + ctrl[key]);
      if (typeof fn === 'function') {
        fn.call(ctrl, args);
      }
    }
  };*/

  ModelService.prototype.set = function(ctrl, args, val, prop) {
    if (typeof args === 'object') {
      var keys = [];
      for ( var key in args) {
        var val = args[key];
        ctrl[key] = val;
        keys.push(key);
      }
      if (args.prop !== false) {
        this.watch(ctrl, keys);
      }
    } else {
      ctrl[args] = val;
      if (prop !== false) {
        this.watch(ctrl, args);
      }
    }
  };

})();
