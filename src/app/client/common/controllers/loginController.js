'use strict';

(function() {
	// body...
	var app = angular.module('login.controller', []);

	app.controller('LoginController', ['$scope', function($scope){
		var app = this;

		$scope.hello = function(){
			alert('hello');
		};

	}]);
})();