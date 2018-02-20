(function(){
  // Angular App Transformer directives
    var app = angular.module('adminApp');
    // back button
    app.directive('backButton', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);
    // show Tooltip On Text Overflow
    app.directive("showTooltipOnTextOverflow", ["$timeout", function($timeout) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var el = element[0];
          scope.$watch(function(){
            return el.scrollWidth;
          }, function() {
            var el = element[0];
            if (el.offsetWidth < el.scrollWidth) {
              //console.log('ellipsis is active for element', element);
              attrs.tooltipEnable = "true";
            } else {
              //console.log('ellipsis is NOT active for element', element);
            }
          });
          /*$timeout(function() {
            var el = element[0];
            if (el.offsetWidth < el.scrollWidth) {
              //console.log('ellipsis is active for element', element);
              attrs.tooltipEnable = "true";
            } else {
              //console.log('ellipsis is NOT active for element', element);
            }
          });*/
        }
      };
    }]);
    // hit enter button then call a perticular funnction
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
})();