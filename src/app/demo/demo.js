angular.module( 'finitio.demo', [
  'ui.router',
  'fullHeight',
  'ui.ace',
  'finitio.examples'
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

.controller( 'DemoCtrl', function DemoController($scope, examples) {
  $scope.state = 'finitio';
  $scope.mode = "validate";
  $scope.status = "none";
  $scope.error = "";
  $scope.examples = examples;
  $scope.example = {};

  $scope.loadExample = function(id){
    for (var i=0; i<$scope.examples.length; i++){
      var ex = $scope.examples[i];
      if (ex.id == id){
        $scope.example = ex;
      }
    }
  };

  $scope.validate = function(){
    var schema = $scope.example.schema,
        data   = $scope.example.data,
        parsed = null,
        system = null,
        coerced = null,
        jstype = null,
        constructor = null;
    try {
      system = Finitio.system(schema, {JsTypes: { Color: Color }});
      try {
        parsed  = JSON.parse(data);
        coerced = system.dress(parsed);
        if ($scope.mode == 'validate'  && !system.resolve('Main').include(parsed)) {
          throw new Error("Invalid value");
        }
        $scope.status = "success";
        jstype = coerced && coerced.constructor;
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

  $scope.loadExample('hello');
  $scope.$watch("mode", $scope.validate);
  $scope.$watch("example.schema", $scope.validate);
  $scope.$watch("example.data", $scope.validate);
})

;

