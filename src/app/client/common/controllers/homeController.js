'use strict';

(function() {
	// body...
	var app = angular.module('home.controller', []);

	app.controller('HomeController', ['$scope', function($scope){

		var app = this;

		$scope.tracks = [];

		$scope.hello = function(){
			alert('hello');
		};

	}]);
})();