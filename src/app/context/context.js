angular.module( 'finitio.context', [
  'ui.router',
  'fullHeight',
  'ui.ace'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'context', {
    url: '/context',
    views: {
      "main": {
        controller: 'ContextCtrl',
        templateUrl: 'context/context.tpl.html'
      }
    }
  });
})

.controller( 'ContextCtrl', function ContextController($rootScope) {
})

;

