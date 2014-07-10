angular.module( 'fullHeight', [] )

.directive('fullHeight', function ($window) {
  return function (scope, element) {
    function applyResizing() {
      var offset = element.attr("full-height") || (-25);
      offset = parseInt(offset, 10);
      element.css("height", (parseInt($window.innerHeight, 10) + offset) + "px");
    }
    angular.element($window).bind('resize', function(){
      scope.$apply(function() { applyResizing(); });
    });
    applyResizing();
  };
})

;
