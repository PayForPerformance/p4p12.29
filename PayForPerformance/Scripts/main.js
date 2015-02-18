require.config({
    // relative url from where modules will load
    baseUrl: "Scripts/",
    shim: {
      jquery: {
        exports: 'jquery'
      },
      underscore: {
        exports: '_'
      },
      "jquery.mobile-1.4.2.min": {
        deps: ['jquery'],
      },
      angular: {
        deps: ['jquery', 'jquery.mobile-1.4.2.min'],
        exports: 'angular'
      },
      highcharts: {
        deps: ['jquery'],
        exports: "Highcharts"
      },
      dxAll: {
        deps: ['Globalize', 'jquery'],
        exports: 'DevExpress'
      },
      angularSanitize: {
        deps: ['angular'],
        exports: 'angularSanitize'
      },
      chartModules: {
        deps: ['Highcharts', 'highcharts-more'],
        exports: 'chart-modules'
      },
      dataUtilities: {
        deps: ['comhar-namespacing'],
        exports: 'data-utilities'
      }
      
    },
    paths: {
     
        "jquery": "jquery-1.9.1.min",
        "Globalize": "globalize.min",
        "_": "underscore.min",
        "angular": "angular-1.3.5.min",
        "angularSanitize": "./angular-sanitize.min",
        "dxAll": "dxAll",
        "app": "./app/app",
        "controller": "./app/controller",
        "factories": "./app/factories"

    },

});

require(["jquery", 
    "jquery.mobile-1.4.2.min",
    "comhar-namespacing",
    "data-utilities", 
    "dxAll",
    "angular",
    "angularSanitize", 
    "controller",
    "factories",
    "app"], function(jquery, jqueryMobile, comharNamespacing, dataUtilities, DevExpress, angular, angularSanitize, controller, factories, ComharNGApp) {
      var app = require('app')
      console.log(app)

      angular.element(document).ready(function() {
        console.log('yolo')
        document.body.className = document.body.className.replace("no-js","");
        document.body.className = document.body.className.replace("dx-theme-generic dx-theme-generic-typography dx-color-scheme-light","");
        angular.bootstrap(document, ['ComharNGApp']);
      });
      
});
