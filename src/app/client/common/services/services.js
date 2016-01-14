'use strict';

(function(){
	
	var services = angular.module('multitrack.services', ['ngResource']);

	services.factory('UsersFactory', ['$resource', 'baseUrl', function($resource, baseUrl){

		return $resource('users', {}, {
			query: { method: 'GET', isArray: true},
			create: {method: 'POST'}
		});
		/**
		return $resource(baseUrl+'users', {}, {
			query: { method: 'GET', isArray: true},
			create: {method: 'POST'}
		});**/
			
	}]);

	services.factory('UserFactory', ['$resource', 'baseUrl', function($resource, baseUrl){

		/**
		return $resource(baseUrl+'/users/:id', {}, {
			show: {method: 'GET'},
			update: {method: 'PUT', params:{id:'@id'}},
			delete: {method: 'DELETE', params:{id:'@id'}}
		});**/

		return $resource('users/:id', {}, {
			show: {method: 'GET'},
			update: {method: 'PUT', params:{id:'@id'}},
			delete: {method: 'DELETE', params:{id:'@id'}}
		});
	}]);
})();