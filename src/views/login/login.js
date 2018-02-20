/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */
 
(function(){
  angular.module('adminApp')
  .controller('LoginCtrl',['$scope','Notification','LoginService','$state', function($scope,Notification,LoginService,$state) {
    console.log("came here LoginCtrl");
    
    $scope.doLogin = function(){
      LoginService.saveTokenToLocalStorage('askdhaskdjakdjasdhk');
      $state.go('dashboard.home');
    };
  }]);
})();