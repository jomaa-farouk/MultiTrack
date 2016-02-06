(function(){

	var app = angular.module('multitrack.directives', []);

	app.directive('dirAccount', [function(){
		return{
			template: '<div style="float:right;"><strong><a ng-click="register()">{{leftBtn}}</a> | <a ng-click="connectDisconnect()">{{rightBtn}}</a></strong></div>'
		} 
	}]);

	app.directive('logOut', [function(){
		return{
			template:'<br><div style="float:right"><strong><a ng-click="logout()">Logout</a></strong></div>' 
		}
	}]);
})();