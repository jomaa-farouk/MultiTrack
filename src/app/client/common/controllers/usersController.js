'use strict';

(function() {
	// body...
	var app = angular.module('users.controller', []);

	app.controller('UsersController', ['$scope', 'UserFactory', 'UsersFactory', '$location', 
		function($scope, UserFactory, UsersFactory, $location){
		var app = this;

		/**
		$scope.connected = false;

		if(!$scope.connected){
			$location.path('/login');
		}**/


		$scope.editUser = function(uid){
			$location.path('/user-detail/'+uid);
		};

		$scope.deleteUser = function(uid){
			UserFactory.delete({id:uid});
			$scope.users = UsersFactory.query();
		};

		$scope.createNewUser = function(){
			$location.path('/user-creation');
		}

		$scope.users = UsersFactory.query();

	}]);


	app.controller('UserController', ['$scope', '$routeParams', 'UserFactory', '$location', 
		function($scope, $routeParams, UserFactory, $location){
		
		$scope.updateUser = function(){
			var $id = $routeParams.id;
			UserFactory.update({id: $id}, $scope.user);
			$location.path('/user-list');
		};

		$scope.cancel = function(){
			$location.path('/user-list');
		};

		$scope.user = UserFactory.show({id: $routeParams.id});

	}]);

	app.controller('UserCreation', ['$scope', 'UsersFactory', 'AuthFactory','$location', 
		function($scope, UsersFactory, AuthFactory, $location){
		
		$scope.createNewUser = function(){
			var hash = AuthFactory.crypt($scope.user.passwd);
			$scope.user.passwd = hash;
			console.log('password hash is ',$scope.user.passwd);
			UsersFactory.create($scope.user);
		};
	}]);

})();














//https://docs.angularjs.org/api/ngResource/service/$resource