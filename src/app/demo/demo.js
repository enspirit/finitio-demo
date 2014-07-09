angular.module( 'finitio.demo', [
  'ui.router',
  'fullHeight',
  'ui.ace'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'demo', {
    url: '/demo',
    views: {
      "main": {
        controller: 'DemoCtrl',
        templateUrl: 'demo/demo.tpl.html'
      }
    }
  });
})

.controller( 'DemoCtrl', function DemoController( $scope ) {
  $scope.schema = "@import finitio/data\n\nInteger";
  $scope.data = "12";
  $scope.status = "none";
  $scope.error = "";

  $scope.validate = function(){
    var schema = $scope.schema,
        data   = $scope.data;
    var system = null,
        coerced = null,
        jstype = null,
        constructor = null;
    try {
      system = Finitio.system(schema);
      try {
        coerced = system.dress(JSON.parse(data));
        $scope.status = "success";
        jstype = coerced.constructor;
        if (jstype) {
          jstype = jstype.name;
        } else {
          jstype = typeof(coerced);
        }
        $scope.message = "(js:" + jstype + ") " + coerced;
      } catch (ex) {
        $scope.status = "error";
        if (ex.explainTree) {
          $scope.message = ex.explainTree();
        } else {
          $scope.message = ex.message;
        }
      }
    } catch (ex) {
      $scope.status = "error";
      if (ex.rootCause) {
        $scope.message = ex.rootCause.message;
      } else {
        $scope.message = ex.message;
      }
    }    
  };

  $scope.$watch("schema", $scope.validate);
  $scope.$watch("data", $scope.validate);
})

;

