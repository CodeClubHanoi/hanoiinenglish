'use strict';

/* Controllers */

// These lines are to pass jshint
var angular = angular || null,
    CONFIG = CONFIG || null;

angular.module('myApp.controllers', []).
    controller('AuthCtrl', ['$scope', '$location', AuthCtrl]).
    controller('HomeCtrl', ['$scope', '$location', '$http', HomeCtrl]);

function AuthCtrl($scope, $location) {
    $scope.$location = $location;

    var meetup,
        cookie = 'access_token={0};path=/;domain=.'+ CONFIG.HOST +';max-age={1}',
        hash = $location.path().replace('/', ''),
        authUrl = 'https://secure.meetup.com/oauth2/authorize';

    authUrl += '?client_id=' + CONFIG.KEY;
    authUrl += '&response_type=token';
    authUrl += '&redirect_uri=https://'+ CONFIG.HOST +'/';
    authUrl += '&scope=ageless+messaging';

    $scope.authorize = function() {
        window.location = authUrl;
    };
    $scope.auth = document.cookie;

    if ($scope.auth.length <= 0) {
        if (hash && hash.length > 0) {
            $location.path('/').search(hash).hash('');
            return;
        }

        meetup = $location.search();
        if (meetup.access_token) {
            // Create authenticated cookie
            cookie = cookie.replace('{0}', meetup.access_token);
            document.cookie = cookie.replace('{1}', meetup.expires_in / 1000);
            
            // Redirect to DashboardCtrl
            $location.path('/dashboard').search('');
            return;
        }
    }
}

function HomeCtrl($scope, $location, $http) {
    $scope.$location = $location;

    var token;

    if (!document.cookie) {
        $location.path('/').search('').hash('');
        return;
    }

    token = document.cookie.split('=')[1];

    $scope.greeting = function() {
        var apiUrl = 'https://api.meetup.com/2/member/self?&access_token={0}';
        if (token) {
            apiUrl = apiUrl.replace('{0}', token);
            $http({method: 'GET', url: apiUrl}).
                success(function(data, status) {
                    $scope.name = data.name;
                }).
                error(function(data, status) {
                    $scope.name = data || {error: 'Unknown'};
                });
        }
    };

    $scope.getEvents = function() {
        var apiUrl = 'https://api.meetup.com/2/events.json?&text_format=plain&status=upcoming&group_id=10682262&venue_id=17575392&page=20&access_token={0}';
        if (token) {
            apiUrl = apiUrl.replace('{0}', token);
            $http({method: 'GET', url: apiUrl}).
                success(function(data, status) {
                    $scope.events = data.results.filter(function(event) {
                        return event && event.venue.id === 17575392; // Codelovers venue's id
                    });
                }).
                error(function(data, status) {
                    $scope.events = data || {error: 'Unknown'};
                });
        }
    };

    $scope.greeting();
}
