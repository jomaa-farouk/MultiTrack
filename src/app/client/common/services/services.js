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

	services.factory('MixFactory', ['$resource', function($resource) {
		// body...
		return $resource('/mixs/:id', {}, {
			read: {method:'GET'},
			update: {method:'PUT', params:{id:'@id'}},
			delete: {method:'DELETE', params:{id:'@id'}}
		});
	}]);

	services.factory('CommentsFactory', ['$resource', function($resource){

		return $resource('/comments', null, {
			query : {method:'GET', isArray:true},
			create: {method:'POST'}
		});
	}]);

	services.factory('CommentFactory', ['$resource', function($resource) {
		// body...
		return $resource('/comments/:id', {}, {
			read: {method:'GET'},
			update: {method:'PUT', params:{id:'@id'}},
			delete: {method:'DELETE', params:{id:'@id'}}
		});
	}]);

	services.factory('RatingFactory', ['$resource', function($resource) {
		// body...
		return $resource('/ratings/:id', {}, {
			read: {method:'GET'},
			update: {method:'PUT', params:{id:'@id'}},
			delete: {method:'DELETE', params:{id:'@id'}}
		});
	}]);

	services.factory('RatingsFactory', ['$resource', function($resource){

		return $resource('/ratings/:id', null, {
			query : {method:'GET', isArray:true},
			create: {method:'POST'}
		});
	}]);		
})();