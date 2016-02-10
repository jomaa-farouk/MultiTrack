'use strict';

(function(){

	var app = angular.module('comments.controller', []);

	app.controller('CommentsController', ['$scope', 'CommentsFactory', 'CommentFactory','AuthFactory', '$location',
		function($scope, CommentsFactory, CommentFactory, AuthFactory, $location){
			var app = this;
			
			if(!AuthFactory.check()){
				$location.path("/login");
			}

			$scope.logout = function(){
				AuthFactory.logout();
				$location.path("/home");
			};

			$scope.deleteById = function(id_){
				CommentFactory.delete({id:id_});
				$scope.comments = CommentsFactory.query();
			};

			$scope.comments = CommentsFactory.query();
	}]);
})();