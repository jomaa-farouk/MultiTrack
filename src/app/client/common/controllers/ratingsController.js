'use strict';

(function() {
	// body...
	var app = angular.module('ratings.controller', []);

	app.controller('RatingsController', ['$scope', 'RatingFactory', 'RatingsFactory', 'AuthFactory', '$location', 
		function($scope, RatingFactory, RatingsFactory, AuthFactory, $location){

			if(!AuthFactory.check()){
				$location.path("/login");
			};

			$scope.logout = function(){
				AuthFactory.logout();
				$location.path("/home");
			};

			$scope.deleteById = function(uid){
				RatingFactory.delete({id:uid});
				$scope.ratings = RatingsFactory.query();
			};

			$scope.ratings = RatingsFactory.query();
	}]);
})();