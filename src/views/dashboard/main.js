/**
 * @ngdoc function
 * @name adminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminApp
 */
 
(function(){
  angular.module('adminApp').controller('MainCtrl',['$scope','$cookieStore', function($scope,$cookieStore) {
  console.log("came here MainCtrl");
    $(".push_menu").click(function(){
         $(".navbar-brand").toggleClass('navbar-brandFull');
         $("#logo").toggleClass('logo');
         $(".wrapper").toggleClass("active");
         $('#menuItem').toggleClass('menuHide');
         $('#menuItemIcon').toggleClass('menuShow');
         $('.footer-bottom').toggleClass('footer-bottom-full');
    });
    
    if($(window).width() < 480) {
         $(".navbar-brand").toggleClass('navbar-brandFull');
         $("#logo").toggleClass('logo');
         $(".wrapper").toggleClass("active");
         $('#menuItem').toggleClass('menuHide');
         $('#menuItemIcon').toggleClass('menuShow');
         $('.footer-bottom').toggleClass('footer-bottom-full');
    }else{
      console.log("nabvar it is not collapse")
    }
    // $('.panel-collapse').on('show.bs.collapse', function () {
    //   $(this).siblings('.panel-heading').addClass('active');
    // });
  
    // $('.panel-collapse').on('hide.bs.collapse', function () {
    //   $(this).siblings('.panel-heading').removeClass('active');
    // });
  
  }]);
})();