(function(){
    angular.module('adminApp')
    .factory('LoginService',['$http','$window','$cookies','localStorageService',function($http,$window,$cookies,localStorageService){
      
        var base_url = $window.apiAccessLayer.url
        
        var factory = {};
        
        factory.get = function(){
          return $http.get(base_url+'/api/v1/user-schema/');
        }
        factory.saveTokenToLocalStorage = function(token){
          return localStorageService.set('token',token);
        };
        
        factory.deleteTokenFromLocalStorage = function(){
          return localStorageService.remove('token');
        };

        factory.getTokenFromLocalStorage = function(){
          return localStorageService.get('token');
        };
        
        return factory;
    }]);
})();