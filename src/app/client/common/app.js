'use strict';

angular.module('multitrack',  ['ngRoute',
    'webaudio.controller'
    ]).

config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {templateUrl:'common/views/connexion.html', controller:'ConnexionController'});
	    $routeProvider.when('/webaudio', {templateUrl:'common/views/accueil.html', controller:'WebaudioCtrl'});

    $routeProvider.otherwise({redirectTo : '/'});
}]);
