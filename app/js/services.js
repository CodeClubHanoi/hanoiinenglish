'use strict';

/* Services */

// This line is to pass jshint
var angular = angular || null;

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');
