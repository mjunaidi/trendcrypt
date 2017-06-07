(function() {
  'use strict';
  angular.module('app.directives', []);
  angular.module('app.directives').directive('ngTimeago', timeAgo);
  angular.module('app.directives').directive('ngSlideToggle', slideToggle);
  
  function timeAgo($q) {
    return {
      restrict : "A",
      scope : {
        title : '@'
      },
      link : function(scope, element, attrs) {
        // Using deferred to assert we only initialize timeago() once per directive.
        var parsedDate = $q.defer();
        parsedDate.promise.then(function() {
          jQuery(element).timeago();
        });
        attrs.$observe('title', function(newValue) {
          parsedDate.resolve(newValue);
        });
      }
    };
  }

  function slideToggle() {
    return {
      restrict : "A",
      scope : {},
      link : function(scope, element, attrs) {
        element.bind('click', function() {
          jQuery(attrs.ngSlideToggle).slideToggle();
        });
      }
    };
  }
})();