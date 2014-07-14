module.exports = {
  build_dir: 'build',
  compile_dir: 'bin',
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    
    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.min.js',
      'vendor/bootstrap/dist/js/bootstrap.min.js',
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-ui-utils/modules/route/route.js',
      'vendor/angular-ui-ace/ui-ace.js',
      'vendor/finitio.js/dist/finitio.min.js',
    ],
    css: [
    ],
    assets: [
      'vendor/ace-builds/src-min-noconflict/ace.js',
      'vendor/ace-builds/src-min-noconflict/theme-clouds.js',
      'vendor/ace-builds/src-min-noconflict/mode-json.js',
      'vendor/ace-builds/src-min-noconflict/worker-json.js',
      'vendor/ace-builds/src-min-noconflict/mode-ruby.js',
      'vendor/ace-builds/src-min-noconflict/mode-javascript.js'
    ]
  }
};
