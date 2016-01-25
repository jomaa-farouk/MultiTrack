'use strict';

(function() {
	// body...

	var app = angular.module('mixs.controller', []);

	app.controller('MixsController', ['$scope', 'MixFactory', 'MixsFactory', '$location',
		function($scope, MixFactory, MixsFactory, $location){

			$scope.editMix = function(mixId){
				$location.path('/mix-edit/'+mixId);
			};

			$scope.deleteMix = function(mixId){
				MixFactory.delete({id:mixId});
				$scope.mixs = MixsFactory.query();
			};

			$scope.createNewMix = function(){
				$location.path('/mix-creation');
			};

			$scope.mixs = MixsFactory.query();
		}
	]);

	app.controller('MixController', ['$scope', 'MixFactory', '$routeParams', '$location', 
		function($scope, MixFactory, $routeParams, $location){

			$scope.updateTack = function(){
				MixFactory.update({id:$routeParams.id}, $scope.mix);
				$location.path('/mix-list');
			};

			$scope.cancel = function(){
				$location.path('/mix-list');
			};

			$scope.mix = MixFactory.read({id:$routeParams.id});
		}
	]);

	app.controller('MixCreation', ['$scope', 'MixsFactory', '$location', 
		function($scope, MixsFactory, $location){

			$scope.createNewMix = function(){
				MixsFactory.create($scope.mix);
				$location.path('/mix-list');
			}

		}
	]);
})();