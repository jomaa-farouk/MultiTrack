'use strict';

(function() {
	// body...
	var app = angular.module('users.controller', []);

	app.controller('UsersController', ['$scope', 'AuthFactory','UserFactory', 'UsersFactory', '$location', 
		function($scope, AuthFactory, UserFactory, UsersFactory, $location){
		var app = this;

		

		if(!AuthFactory.check()){
			$location.path('/login');
		};


		$scope.logout = function(){
			AuthFactory.logout();
			$location.path('/home');
		};

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
		$scope.roles = [
			{id: 'Admin'}, {id: 'User'}, {id: 'Guest'}
		]
			
		$scope.createNewUser = function(){
			var hash = AuthFactory.crypt($scope.user.passwd);
			$scope.user.passwd = hash;
			$scope.user.role = "User";
			console.log('password hash is ',$scope.user.passwd);
			UsersFactory.create($scope.user);
			$location.path('/home');
		};
	}]);

})();














//https://docs.angularjs.org/api/ngResource/service/$resource