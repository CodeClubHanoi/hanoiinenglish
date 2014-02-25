'use strict';

/* Directives */

// This line is to pass jshint
var angular = angular || null;

angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
