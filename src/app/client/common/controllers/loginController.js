'use strict';

(function() {
	// body...
	var app = angular.module('login.controller', []);

	app.controller('LoginController', ['$scope', 'AuthFactory','$http', '$location',
		function($scope, AuthFactory, $http, $location){
		var app = this;

		$scope.login = function(){
			$scope.user.passwd = AuthFactory.crypt($scope.user.passwd);	
			var response = $http.get('/users/'+$scope.user.username+'/'+$scope.user.passwd);
			response.success(function(data){
				$scope.message = "successful!";
				$scope.user = data.user[0];
				console.log($scope.user);
				if($scope.user!==undefined){
					alert($scope.user.username+': logged successful');
					AuthFactory.login($scope.user);
					$location.path('/home');	
				}else{
					alert('Wrong User / Password');
				}
				
			});
			response.error(function(data){
				alert('Wrong User / Password');
			});

			console.log('the passwd hash is', $scope.user.passwd);
		};

	}]);
})();