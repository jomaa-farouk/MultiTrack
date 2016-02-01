'use strict';

angular.module('multitrack',  ['ngRoute',
    'angular-md5',
    'multitrack.services',
    'home.controller',
    'tracks.controller',
    'mixs.controller',
    'users.controller',
    'login.controller',
    'signup.controller'
    ])
    .constant('baseUrl', "http://localhost:8080")
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

    $routeProvider.when('/', {templateUrl:'common/views/home.html', controller:'HomeController'});
	
    $routeProvider.when('/user-list', {templateUrl:'common/views/users/user-list.html', controller:'UsersController'});
    $routeProvider.when('/user-creation', {templateUrl:'common/views/users/user-creation.html', controller:'UserCreation'});
    $routeProvider.when('/user-detail/:id', {templateUrl:'common/views/users/user-detail.html', controller:'UserController'});	

    $routeProvider.when('/mix-list', {templateUrl:'common/views/mixs/mix-list.html', controller:'MixsController'});
    $routeProvider.when('/mix-creation', {templateUrl:'common/views/mixs/mix-creation.html', controller:'MixCreation'});
    $routeProvider.when('/mix-edit/:id', {templateUrl:'common/views/mixs/mix-detail.html', controller:'MixController'});

    $routeProvider.when('/track-list', {templateUrl:'common/views/tracks/track-list.html', controller:'TracksController'});
    $routeProvider.when('/track-creation', {templateUrl:'common/views/tracks/track-creation.html', controller:'TrackCreation'});
    $routeProvider.when('/track-edit/:id', {templateUrl:'common/views/tracks/track-detail.html', controller:'TrackController'});

    $routeProvider.when('/login', {templateUrl:'common/views/login.html', controller:'LoginController'});
	   
    $routeProvider.otherwise({redirectTo : '/'});
}]);
