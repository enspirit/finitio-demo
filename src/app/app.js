angular.module( 'finitio', [
  'templates-app',
  'templates-common',
  'ui.router',
  'finitio.context',
  'finitio.demo'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/demo' );
})

.run( function run($rootScope) {
  $rootScope.context = 'function Color(triple){\n  this.triple = triple;\n}\n\nColor.rgb = function(triple){\n  return new Color(triple);\n};\n\nColor.prototype.toRgb = function(){\n  return this.triple;\n};\n\nColor.hex = function(hex){\n  var f = function(off){\n    return parseInt(hex.slice(off, off+2), 16);\n  };\n  return Color.rgb([f(1), f(3), f(5)]);\n};\n\nColor.prototype.toHex = function(){\n  var r = this.triple[0],\n      g = this.triple[1],\n      b = this.triple[2];\n  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);\n};\n\nColor.prototype.toString = function(){\n  var r = this.triple[0],\n      g = this.triple[1],\n      b = this.triple[2];\n  return "Color(" + r + "," + g + "," + b + ")";\n};\n';
})

.controller( 'AppCtrl', function AppCtrl () {
})

;

