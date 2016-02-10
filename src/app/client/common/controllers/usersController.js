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

			
/*			var response = $http.post('/users/', $scope.user);
*/			/*response.error(function(data, status, header, config){
				$scope.showError = true;
				$scope.message = "Error : "+status+ " Existing username '"+$scope.user.username+"' or empty field(s)";
				console.log ('user exist');
			});*/

                var input = document.getElementById('first_name');
                var validityState_object = input.validity;

 				var input2 = document.getElementById('phone');
                var validityState_object2 = input2.validity;

 				var inputmail = document.getElementById('email');
 				var mail = inputmail.value;
                var mail_valid = true;

 				if (mail!=null && mail !='') {
 					
 					if (validateEmail (mail)) input.setCustomValidity('');
 					else 
 					{
 				     input.setCustomValidity('you must enter a valid mail'); 
 				     mail_valid = false;
 					 }

                }

                if(validityState_object.valueMissing)
                    input.setCustomValidity('You must enter a username');
                else
                    input.setCustomValidity('');

 				if(validityState_object2.valueMissing)
                    input2.setCustomValidity('You must enter a password');
                else
                    input2.setCustomValidity('');


if (mail_valid && !validityState_object.valueMissing && !validityState_object2.valueMissing)
            $http.post('/users' , $scope.user ).then(function (response) {
          console.log ('we are here');
          if (response.data.error != null) {console.log ('error');
          		$scope.showError = true;
				$scope.message = "Error : "+status+ " Existing username '"+$scope.user.username+"' or empty field(s)";
				}
			else  
			{alert ('user created successfully');
		    $location.path("/home");}
	
          return response.data;
			});

/*if c pas bon
          		$scope.showError = true;
				$scope.message = "Error : "+status+ " Existing username '"+$scope.user.username+"' or empty field(s)";
*/
            /*success(function(data, status, header, config){
				console.log($scope.user + " created successfly!");
				$location.path("/home");
			}).error(function(data, status, header, config){
				console.log ('user exist');
			});
*/
/*			response.success(function(data, status, header, config){
				console.log($scope.user + " created successfly!");
				$location.path("/home");
			});
*/
			
		};


	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	}
	
	}]);
})();














//https://docs.angularjs.org/api/ngResource/service/$resource