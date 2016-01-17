'use strict';

(function() {
	// body...
	var app = angular.module('home.controller', []);

	app.controller('HomeController', ['$scope', 'MixsFactory', 'TrackFactory', 'TracksFactory', 
		function($scope, MixsFactory, TrackFactory,TracksFactory){

		var app = this;

		/********************      MIXS              *****************************/
		$scope.getAllMixs = function(){
			MixsFactory.query(
				function(response){
					$scope.message = 'Loading ...';
					$scope.showMixs = true;
					$scope.mixs = response;
				},
				function(response){
					$scope.message = 'Error: '+response.status+' '+response.statusText;
				}
			);
		};

		// on recupere un mix par id 
		$scope.getMix = function(mixId){
			MixsFactory.get({id:mixId}).$promise.then(
				function(response){
					$scope.showMix = true;
					$scope.mix = response;
				},
				function(response){
					$scope.message = 'Error: '+response.status+' '+response.statusText;
				}
			);
		};

		/********************     TRACKS              ********************/

		$scope.findAllTracks = function(){

			$scope.TracksFactory.query(
				function(response){
					$scope.showTracks = true;
					$scope.tracks = response;
				},
				function(response){
					$scope.message = 'Erro: '+response.status+' '+response.statusText;
				}
			);
		};


		$scope.findTrackById = function(trackId){
			TracksFactory.show({params:trackId}).$promise.then(
				function(response){
					$scope.showTrack = true;
					$scope.track = response;
				},
				function(response){
					$scope.message = 'Error: '+response.status+' '+response.statusText;
				}
			);
		};


		$scope.deleteTrack = function(trackId){
			TrackFactory.delete({id: trackId});
			$scope.tracks = TracksFactory.query();
		};

		$scope.mixs = MixsFactory.query();
		$scope.tracks = TracksFactory.query();
	}]);
})();