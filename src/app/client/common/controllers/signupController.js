'use strict';

(function() {
	// body...
	var app = angular.module('signup.controller', []);

	app.controller('SignupController', ['$scope', function($scope){
		var app = this;

		$scope.hello = function(){
			alert('hello');
		};

	}]);
})();