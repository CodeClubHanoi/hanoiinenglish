'use strict';

/* Filters */

// This line is to pass jshint
var angular = angular || null;

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]);
