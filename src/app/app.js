angular.module( 'finitio', [
  'templates-app',
  // 'templates-common',
  'ui.router',
  'finitio.demo'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/demo' );
})

.run( function run() {
})

.factory('$exceptionHandler', function(){
  return function (exception, cause) {
    console.log("Exception handler");
    console.log(exception);
  };
})

.controller( 'AppCtrl', function AppCtrl () {
})

;

