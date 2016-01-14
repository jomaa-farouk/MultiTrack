'use strict';

(function() {
	// body...
	var app = angular.module('users.controller', []);

	app.controller('UsersController', ['$scope', 'UserFactory', 'UsersFactory', '$location', 
		function($scope, UserFactory, UsersFactory, $location){
		var app = this;
/**
		$scope.users = [
		{
			id: "id0",
			fullname: "Toto Titi",
			email: "toto@titi.fr"
		},{
			id: "id1",
			fullname: "Tata Titi",
			email: "tata@titi.fr"
		}];
**/
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

		//$scope.users = UsersFactory.query();
	}]);


	app.controller('UserController', ['$scope', '$routeParams', 'UserFactory', '$location', 
		function($scope, $routeParams, UserFactory, $location){

		$scope.updateUser = function(){
			UserFactory.update($scope.user);
			$location.path('/users-list');
		};

		$scope.cancel = function(){
			$location.path('/users-list');
		};

		$scope.user = UserFactory.show({id:$routeParams.id});

	}]);

	app.controller('UserCreation', ['$scope', 'UsersFactory', '$location', 
		function($scope, UsersFactory, $location){
		
		$scope.createNewUser = function(){
			UsersFactory.create($scope.user);
			$location.path('/users-list');
		};	
	}]);

})();