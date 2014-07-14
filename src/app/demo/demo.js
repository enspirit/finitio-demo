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

  // examples and currently selected one
  $scope.examples = examples;
  $scope.example = {};

  // Loads the example at `id`
  $scope.loadExample = function(id){
    for (var i=0; i<$scope.examples.length; i++){
      var ex = $scope.examples[i];
      if (ex.id == id){
        $scope.example = ex;
      }
    }
  };

  // current state: finitio or javascript
  $scope.state = 'finitio';

  // current mode: validate or dress
  $scope.mode = "validate";

  // validation results
  $scope.status = "none";
  $scope.message = "";

  // current Finitio system, when parsed
  $scope.system = null;
  $scope.main = null;
  $scope.systemStatus = "error";
  $scope.systemMessage = "";

  // Compiles the system everytime the schema changes
  $scope.$watch("example.schema", function(){
    try {
      var schema = $scope.example.schema;
      $scope.system = Finitio.system(schema, {JsTypes: { Color: Color }});
      $scope.main = $scope.system.resolve('Main');
      $scope.systemStatus = "success";
      $scope.systemMessage = "Finitio system ok.";
    } catch (ex) {
      $scope.system = null;
      $scope.systemStatus = "error";
      $scope.systemMessage = (ex.rootCause && ex.rootCause.message) || ex.message;
    }
  });

  // current JSON data, when parsed
  $scope.data = null;
  $scope.dataStatus = "error";
  $scope.dataMessage = "";

  // Parses the JSON data everytime the source changes
  $scope.$watch("example.data", function(){
    try {
      $scope.data = JSON.parse($scope.example.data);
      $scope.dataStatus = "success";
      $scope.dataMessage = "JSON data ok.";
    } catch (ex) {
      $scope.data = null;
      $scope.dataStatus = "error";
      $scope.dataMessage = ex.message;
    }
  });

  // Coerces data against main as soon as something changes
  $scope.dressed = null;
  $scope.dressedStatus = "error";
  $scope.dressedMessage = "";

  function dress(){
    if ($scope.systemStatus == "error") {
      $scope.dressedStatus = "error";
      $scope.dressedMessage = $scope.systemMessage;
    } else if ($scope.dataStatus == "error") {
      $scope.dressedStatus = "error";
      $scope.dressedMessage = $scope.dataMessage;
    } else {
      try {
        $scope.dressed = $scope.system.dress($scope.data);
        $scope.dressedStatus = "success";
        $scope.dressedMessage = pp($scope.dressed);
      } catch (ex) {
        $scope.dressed = null;
        $scope.dressedStatus = "error";
        $scope.dressedMessage = (ex.explainTree && ex.explainTree()) || ex.message;
      }
    }
  }
  $scope.$watch("system", dress);
  $scope.$watch("data", dress);

  // Validates data against system as soon as something changes
  $scope.validationStatus = "error";
  $scope.validationMessage = "";

  function validate(){
    if ($scope.systemStatus == "error") {
      $scope.validationStatus = "error";
      $scope.validationMessage = $scope.systemMessage;
    } else if ($scope.dataStatus == "error") {
      $scope.validationStatus = "error";
      $scope.validationMessage = $scope.dataMessage;
    } else if ($scope.main.include($scope.data)) {
      $scope.validationStatus = "success";
      $scope.validationMessage = "Value belongs to type.";
    } else if ($scope.dressedStatus == "error") {
      $scope.validationStatus = "error";
      $scope.validationMessage = $scope.dressedMessage;
    } else {
      $scope.validationStatus = "error";
      $scope.validationMessage = "Invalid value for type.";
    }
  }
  $scope.$watch("system", validate);
  $scope.$watch("data", validate);

  function pp(object, depth, embedded) {
    if (typeof(depth) != "number") { depth = 0; }
    if (typeof(embedded) != "boolean"){ embedded = false; }
    var newline = false;
    var spacer = function(depth) {
      var spaces = "";
      for (var i=0;i<depth;i++) {
        spaces += "  ";
      }
      return spaces;
    };
    var pretty = "";
    var content = "";
    if (typeof(object) == "undefined") {
      pretty += "undefined";
    }
    else if (typeof(object) == "boolean" || typeof(object) == "number") {
      pretty += object.toString();
    } else if (typeof(object) == "string") {
      pretty += "\"" + object + "\"";
    }
    else if (object == null) {
      pretty += "null";
    }
    else if (object instanceof(Array)) {
      if ( object.length > 0 ) {
        if (embedded) { newline = true; }
        content = "";
        for (var i=0; i<object.length; i++) {
          if (i !== 0) { content += ", "; }
          content += pp(object[i], depth+1);
        }
        content = content.replace(/,\n\s*$/, "").replace(/^\s*/,"");
        pretty += "[ " + content + " ]";
      } else {
        pretty += "[]";
      }
    }
    else if (typeof(object) == "object") {
      if ( object.toString() != "[object Object]" ) {
        pretty += object.toString();
      } else {
        if ( Object.keys(object).length > 0 ){
          if (embedded) { newline = true; }
          content = "";
          for (var key in object) {
            content += spacer(depth + 1) + key.toString() + ": " + pp(object[key], depth+2, true) + ",\n";
          }
          content = content.replace(/,\n\s*$/, "").replace(/^\s*/,"");
          pretty += "{\n" + spacer(depth + 1) + content + "\n" + spacer(depth) + "}";
        } else {
          pretty += "{}";
        }
      }
    }
    else {
      pretty += object.toString();
    }
    return ((newline ? "\n" + spacer(depth) : "") + pretty);
  }

  $scope.loadExample('hello');
})

;

