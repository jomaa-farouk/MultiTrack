'use strict';

angular.module('multitrack',  ['ngRoute',
    'multitrack.services',
    'home.controller',
    'tracks.controller',
    'users.controller',
    'login.controller',
    'signup.controller'
    ])
    .constant('baseUrl', "http://localhost:8080")
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

     $routeProvider.when('/', {templateUrl:'common/views/home.html', controller:'TracksController'});
	   $routeProvider.when('/users-list', {templateUrl:'common/views/user-list.html', controller:'UsersController'});
    $routeProvider.when('/user-detail/:id', {templateUrl:'common/views/user-detail.html', controller:'UserController'});
	   $routeProvider.when('/login', {templateUrl:'common/views/login.html', controller:'LoginController'});
	   $routeProvider.when('/user-creation', {templateUrl:'common/views/user-creation.html', controller:'UserCreation'});

        $routeProvider.otherwise({redirectTo : '/'});
}]);
