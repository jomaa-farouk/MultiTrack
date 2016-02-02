'use strict';

(function() {
	// body...
	var app = angular.module('signup.controller', []);

	app.controller('SignupController', ['$scope','AuthFactory', 'UsersFactory', '$location',
		function($scope, AuthFactory, UsersFactory, $location){
		var app = this;

		$scope.createNewUser = function(){
			var hash = AuthFactory.crypt($scope.user.passwd);
			$scope.user.passwd = hash;
			console.log('password hash is ',$scope.user.passwd);
			UsersFactory.create($scope.user);
		};
	}]);
})();