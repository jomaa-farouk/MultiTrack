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

	app.controller('UserCreation', ['$scope', '$http', 'UsersFactory', 'AuthFactory','$location', 
		function($scope, $http, UsersFactory, AuthFactory, $location){

		$scope.showError = false;
			
		$scope.createNewUser = function(){
			var hash = AuthFactory.crypt($scope.user.passwd);
			$scope.user.passwd = hash;
			$scope.user.role = "User";
			console.log('password hash is ',$scope.user.passwd);

			
			var response = $http.post('/users', $scope.user);
			
			response.success(function(data, status, header, config){
				console.log($scope.user + " created successfly!");
				$scope.user = data;
				$location.path("/home");
			});

			response.error(function(data, status, header, config){
				$scope.showError = true;
				$scope.message = "Error : "+status+ " Existing username '"+$scope.user.username+"' or empty field(s)";
			});

			
		};
	}]);
})();














//https://docs.angularjs.org/api/ngResource/service/$resource