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
  $scope.schema = "";
  $scope.data = "";
  $scope.status = "none";
  $scope.error = "";

  $scope.examples = [
    {
      id: "hello",
      label: "Hello World!",
      schema: ".",
      data: '"Hello World"'
    },
    {
      id: "separator"
    },
    {
      id: "integer",
      label: "Integer",
      schema: "@import finitio/data\n\nInteger",
      data: "12"
    },
    {
      id: "sbyc",
      label: "Specialization by Constraint (SByC)",
      schema: "@import finitio/data\n\nInteger( i | i>0 )\n",
      data: "-16"
    },
    {
      id: "union",
      label: "Union types",
      schema: "@import finitio/data\n\nInteger | Nil\n",
      data: "16"
    },
    {
      id: "sequence",
      label: "Sequences",
      schema: "@import finitio/data\n\n[ Integer( i | i>0 ) ]\n",
      data: "[2015, 16, 12]"
    },
    {
      id: "set",
      label: "Sets",
      schema: "@import finitio/data\n\n{ Integer( i | i>0 ) }\n",
      data: "[2015, 16, 12, 16]"
    },
    {
      id: "tuple",
      label: "Tuples",
      schema: "@import finitio/data\n\nPassword = String( s | s.length >= 8 )\n\n{\n  name: String\n  password: Password\n}\n",
      data: '{\n  "name": "Bernard Lambeau",\n  "passwor": "finitio"\n}'
    },
    {
      id: "form",
      label: "Tuples + SByC",
      schema: "@import finitio/data\n\nPassword = String( s | s.length >= 8 )\n\n{\n  name: String\n  password: Password\n  confirm: Password\n}( t | samepass: t.password == t.confirm )\n",
      data: '{\n  "name": "Bernard Lambeau",\n  "password": "finitio123",\n  "confirm": "finitio789"\n}'
    },
    {
      id: "relation",
      label: "Relations",
      schema: "@import finitio/data\n\nTalk = {\n  name: String\n  by: String\n}\n\n{Talk}",
      data: '[\n  {\n    "name": "Data Deserves a Language Too",\n    "by": "Bernard Lambeau"\n  },\n  {\n    "name": "CSV on the Web",\n    "by": "Jeni Tennison"\n  }\n]'
    },
    {
      id: "separator"
    },
    {
      id: "date",
      label: "Dates ?",
      schema: "@import finitio/data\n\nDate\n",
      data: '"2015-07-15"'
    }
  ];

  $scope.loadExample = function(id){
    for (var i=0; i<$scope.examples.length; i++){
      var ex = $scope.examples[i];
      if (ex.id == id){
        $scope.schema = ex.schema;
        $scope.data = ex.data;
      }
    }
  };

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
  $scope.$watch("schema", $scope.validate);
  $scope.$watch("data", $scope.validate);
})

;

