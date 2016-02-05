'use strict';

(function() {
	// body...
	var app = angular.module('login.controller', []);

	app.controller('LoginController', ['$scope', 'AuthFactory','$http', '$location',
		function($scope, AuthFactory, $http, $location){
			var app = this;

			$scope.allowAccess = false;
			$scope.redirectTo = function(location){
				$location.path(location);
			};

			$scope.login = function(){
				$scope.user.passwd = AuthFactory.crypt($scope.user.passwd);
				var response = $http.get('/users/'+$scope.user.username+'/'+$scope.user.passwd);
				response.success(function(data){
					$scope.message = "successful!";
					$scope.user = data.user[0];
					console.log($scope.user);
					if($scope.user!==undefined){
						$scope.message = $scope.user.username+': logged successful';
						$scope.allowAccess = true;
						AuthFactory.login($scope.user);
						alert($scope.message);
						$location.path("/home");
					}else{
						$scope.message = "Wrong User / Password";
						//$scope.allowAccess = false;
						alert($scope.message);
					}

				});
				response.error(function(data){
					$scope.message = "Wrong User / Password";
					alert($scope.message);
				});

				console.log('the passwd hash is', $scope.user.passwd);
			};

			$scope.goToTarget = function(){
				if($scope.allowAccess){
					$location.path("/home");
				}else{
					$location.path("/login");
				}
			};

		}]);
})();