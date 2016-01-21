'use strict';

(function(){
	
	var services = angular.module('multitrack.services', ['ngResource']);

	services.factory('UsersFactory', ['$resource', function($resource){
		
		return $resource('/users', {}, {
			query: { method: 'GET', isArray: true},
			create: {method: 'POST'}
		});			
	}]);

	services.factory('UserFactory', ['$resource', function($resource){

		return $resource('users/:id', {}, {
			show: {method: 'GET'},
			update: {method: 'PUT', params:{id:'@id'}},
			delete: {method: 'DELETE', params:{id:'@id'}}
		});
	}]);


	services.factory('TracksFactory', ['$resource', function($resource) {

		return $resource('/tracks', {}, {

			query : {method:'GET', isArray:true},
			create : {method:'POST'}
		});
	}]);

	services.factory('TrackFactory', ['$resource', function($resource) {
		// body...
		return $resource('/tracks/:id', {}, {
			show: {method:'GET'},
			update: {method:'PUT', params:{id:'@id'}},
			delete: {method:'DELETE', params:{id:'@id'}}
		});
	}]);

	services.factory('MixsFactory', ['$resource', function($resource){

		return $resource('/mixs', null, {
			query : {method:'GET', isArray:true},
			create: {method:'POST'}
		});

	}]);	


})();