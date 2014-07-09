angular.module( 'fullHeight', [] )

.directive('fullHeight', function ($window) {
  return function (scope, element) {
    function applyResizing() {
      var offset = element.attr("full-height") || (-25);
      offset = parseInt(offset);
      element.css("height", (parseInt($window.innerHeight) + offset) + "px");
    }
    angular.element($window).bind('resize', function(){
      scope.$apply(function() { applyResizing(); });
    });
    applyResizing();
  };
})

;
