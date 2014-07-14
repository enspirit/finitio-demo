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
  function compileSystem(){
    try {
      var schema = $scope.example.schema;
      $scope.system = Finitio.system(schema, { JsTypes: $scope.context });
      $scope.main = $scope.system.resolve('Main');
      $scope.systemStatus = "success";
      $scope.systemMessage = "Finitio system ok.";
      return true;
    } catch (ex) {
      $scope.system = null;
      $scope.systemStatus = "error";
      $scope.systemMessage = (ex.rootCause && ex.rootCause.message) || ex.message;
      return false;
    }
  }

  // current JSON data, when parsed
  $scope.data = null;
  $scope.dataStatus = "error";
  $scope.dataMessage = "";

  // Parses the JSON data everytime the source changes
  function compileData(){
    try {
      $scope.data = JSON.parse($scope.example.data);
      $scope.dataStatus = "success";
      $scope.dataMessage = "JSON data ok.";
      return true;
    } catch (ex) {
      $scope.data = null;
      $scope.dataStatus = "error";
      $scope.dataMessage = ex.message;
      return false;
    }
  }

  // Parses the context
  $scope.context = {};
  $scope.contextStatus = "error";
  $scope.contextMessage = "";

  // Parses and compiles the context
  function compileContext(){
    try {
      var fn = new Function("module", $scope.example.context);
      var module = { exports: {} };
      fn(module);
      $scope.context = module.exports;
      $scope.contextStatus = "success";
      $scope.contextMessage = "Javascript context ok.";
      return true;
    } catch (ex) {
      $scope.context = {};
      $scope.contextStatus = "error";
      $scope.contextMessage = ex.message;
      return false;
    }
  }

  // Coerces data against main as soon as something changes
  $scope.dressed = null;
  $scope.dressedStatus = "error";
  $scope.dressedMessage = "";

  // Dress data
  function dress(){
    try {
      $scope.dressed = $scope.system.dress($scope.data);
      $scope.dressedStatus = "success";
      $scope.dressedMessage = pp($scope.dressed);
      return true;
    } catch (ex) {
      $scope.dressed = null;
      $scope.dressedStatus = "error";
      $scope.dressedMessage = (ex.explainTree && ex.explainTree()) || ex.message;
      return false;
    }
  }

  // Coerces data against main as soon as something changes
  $scope.undressed = null;
  $scope.undressedStatus = "error";
  $scope.undressedMessage = "";

  // Undress data
  function undress(){
    try {
      var output = $scope.system.resolve('Output');
      $scope.undressed = $scope.main.undress($scope.dressed, output.trueOne());
      $scope.undressedStatus = "success";
      $scope.undressedMessage = pp($scope.undressed);
      return true;
    } catch (ex) {
      console.log(ex.stack);
      $scope.undressed = null;
      $scope.undressedStatus = "error";
      $scope.undressedMessage = (ex.explainTree && ex.explainTree()) || ex.message;
      return false;
    }
  }

  // Validates data against system as soon as something changes
  $scope.validationStatus = "error";
  $scope.validationMessage = "";

  function validate(){
    if ($scope.main.include($scope.data)) {
      $scope.validationStatus = "success";
      $scope.validationMessage = "Yes, `" + dataToString() + "` belongs to " + typeToString();
    } else if ($scope.dressedStatus == "error") {
      $scope.validationStatus = "error";
      $scope.validationMessage = $scope.dressedMessage;
    } else {
      $scope.validationStatus = "error";
      $scope.validationMessage = "Invalid value `" + dataToString() + "` for " + typeToString();
    }
  }

  function run(){
    if (!compileContext()){
      $scope.validationStatus = $scope.dressedStatus = 'error';
      $scope.validationMessage = $scope.dressedMessage = $scope.contextMessage;
      return;
    }

    if (!compileSystem()){
      $scope.validationStatus = $scope.dressedStatus = 'error';
      $scope.validationMessage = $scope.dressedMessage = $scope.systemMessage;
      return;
    }

    if (!compileData()){
      $scope.validationStatus = $scope.dressedStatus = 'error';
      $scope.validationMessage = $scope.dressedMessage = $scope.dataMessage;
      return;
    }

    dress();
    validate();
    undress();
  }
  $scope.$watch("example.schema", run);
  $scope.$watch("example.data", run);
  $scope.$watch("example.context", run);

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

  function dataToString() {
    str = $scope.example.data
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/g, '');
    if (str.length > 35) {
      str = str.slice(0, 30) + " ...";
    }
    return str;
  }

  function typeToString() {
    return $scope.main.trueOne().toString();
  }

  $scope.loadExample('everything');
})

;

