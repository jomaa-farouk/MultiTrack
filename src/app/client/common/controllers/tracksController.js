'use strict';

(function(){

	var app = angular.module('tracks.controller', []);

	app.controller('TracksController', ['$scope', 'TrackFactory', 'TracksFactory', '$location', 

		function($scope, TrackFactory, TracksFactory, $location) {
			

			$scope.editTrack = function(trackId) {
				$location.path('/track-detail/'+trackId);
			};

			$scope.deleteTrack = function(trackId) {
				TrackFactory.delete({id:trackId});
				$location.path('/');
			};

			$scope.addTrack = function() {
				$location.path('/track-creation');
			};

			$scope.tracks = TracksFactory.query();	
		}
	]);


	app.controller('TrackController', ['$scope', 'TrackFactory', '$routeParams', '$location', 
		function($scope, TrackFactory, $routeParams, $location){

			$scope.updateTrack = function(){
				$id = $routeParams.id;
				TrackFactory.update({id:$id}, $scope.track);
				$location.path('/');
			};

			$scope.cancel = function(){
				$location.path('/');
			};

			$scope.track = TrackFactory.show({id:$routeParams.id});
		}
	]);

	app.controller('TrackCreation', ['$scope', 'TracksFactory', '$location', 
		function($scope, TracksFactory, $location) {
		// body...
			$scope.addNewTrack = function() {
				// body...
				TracksFactory.create($scope.track);
				$location.path('/');
			};

		}
	]);
})();