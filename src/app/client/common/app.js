'use strict';

angular.module('multitrack',  ['ngRoute',
    'users.controller'
    ]).

config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {templateUrl:'common/views/connexion.html', controller:'ConnexionController'});
    $routeProvider.otherwise({redirectTo : '/'});
}]);
