(function(){
	var app = angular.module('webaudio.controller', []);
	
	app.controller('WebaudioCtrl', ['$scope', '$window', function(){
		app = this;
		
		
		$scope.foo = function(){
			alert('hell');
		};
	
	}]);


})();