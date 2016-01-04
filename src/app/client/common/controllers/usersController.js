'use strict';

(function() {
	// body...
	var app = angular.module('users.controller', []);

	app.controller('UsersController', ['$scope', function($scope){
		var app = this;

		$scope.hello = function(){
			alert('hello');
		};

	}]);
})();