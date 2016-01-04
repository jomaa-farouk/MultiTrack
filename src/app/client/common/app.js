'use strict';

angular.module('multitrack',  ['ngRoute',
    'home.controller',
    'users.controller',
    'login.controller',
    'signup.controller'
    ]).

config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/', {templateUrl:'common/views/home.html', controller:'HomeController'});
	$routeProvider.when('/users', {templateUrl:'common/views/users.html', controller:'UsersController'});
	$routeProvider.when('/login', {templateUrl:'common/views/login.html', controller:'LoginController'});
	$routeProvider.when('/signup', {templateUrl:'common/views/signup.html', controller:'SignupController'});

    $routeProvider.otherwise({redirectTo : '/'});
}]);
//C:\Users\mahmo_000\workspace\MultiTrack\src\app\client\common\views