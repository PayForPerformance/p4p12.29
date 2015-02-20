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
      Globalize: {
        deps: ['jquery'],
        exports: "Globalize"
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
      "comhar-namespacing": {
        exports: 'comharApp'
      }, 
      dataUtilities: {
        deps: ['comhar-namespacing'],
        exports: 'data-utilities'
      }
      
    },
    paths: {
        "jquery": "jquery-1.11.2.min",
        "Globalize": "globalize.min",
        "underscore": "underscore.min",
        "angular": "angular-1.3.5.min",
        "angularSanitize": "./angular-sanitize.min",
        "dxAll": "dxWebApps",
        "app": "./app/app",
        "controller": "./app/controller",
        "factories": "./app/factories",
        "dashboard": "dashboard-1.0.0",


    },

});

require(["jquery", 
    "jquery.mobile-1.4.2.min",
    "Globalize",
    "comhar-namespacing",
    "underscore",
    "data-utilities",
    "chart-modules", 
    "dxAll",
    "json2csv",
    "dashboard",
    "highcharts-more",
    "angular",
    "angularSanitize", 
    "controller",
    "factories",
    "app"], function(jquery, jqueryMobile, Globalize, comharApp, _, dataUtilities, chartModules, DevExpress, csvConverter, dashboard, highchartsMore, angular, angularSanitize, controller, factories, ComharNGApp) {


      angular.element(document).ready(function() {

        document.body.className = document.body.className.replace("no-js","");
        document.body.className = document.body.className.replace("dx-theme-generic dx-theme-generic-typography dx-color-scheme-light","");
        angular.bootstrap(document, ['ComharNGApp']);
      });
      
});
