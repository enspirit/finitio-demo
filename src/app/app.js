angular.module( 'finitio', [
  'templates-app',
  'templates-common',
  'ui.router',
  'finitio.demo'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/demo' );
})

.run( function run($rootScope) {
})

.controller( 'AppCtrl', function AppCtrl () {
})

;

