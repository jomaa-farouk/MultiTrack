'use strict';

(function(){

	var app = angular.module('tracks.controller', []);

	app.controller('TracksController', ['$scope', 'AuthFactory','TrackFactory', 'TracksFactory', '$location', 

		function($scope, AuthFactory, TrackFactory, TracksFactory, $location) {

			if(!AuthFactory.check()){
				$location.path('/login');
			};

			$scope.logout = function(){
				AuthFactory.logout();
				$location.path('/home');
			};	
			
			$scope.editTrack = function(trackId) {
				$location.path('/track-edit/'+trackId);
			};

			$scope.deleteTrack = function(trackId) {
				TrackFactory.delete({id:trackId});
				$scope.tracks = TracksFactory.query();
			};

			$scope.createNewTrack = function() {
				$location.path('/track-creation');
			};

			$scope.tracks = TracksFactory.query();	
		}
	]);


	app.controller('TrackController', ['$scope', 'TrackFactory', '$routeParams', '$location', 
		function($scope, TrackFactory, $routeParams, $location){

			$scope.updateTrack = function(){
				TrackFactory.update({id:$routeParams.id}, $scope.track);
				$location.path('/track-list');
			};

			$scope.cancel = function(){
				$location.path('/track-list');
			};

			$scope.track = TrackFactory.show({id:$routeParams.id});
		}
	]);

	app.controller('TrackCreation', ['$scope', 'TracksFactory', '$location', 
		function($scope, TracksFactory, $location) {
		// body...
			$scope.createNewTrack = function() {
				// body...
				TracksFactory.create($scope.track);
				$location.path('/track-list');
			};
		}
	]);
})();