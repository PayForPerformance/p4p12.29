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
      
    },
    paths: {
        "jquery": "jquery-1.11.2.min",
        "Globalize": "globalize.min",
        "underscore": "underscore.min",
        "angular": "angular-1.2.9.min",
        "angularSanitize": "./angular-sanitize.min",
        "dxAll": "dxWebApps",
        "app": "./app/app",
        "controller": "./app/controller",
        "factories": "./app/factories",
        "dashboard": "dashboard-1.0.0",
        "program-factory": "./app/program-factory"
    },

});

require(["jquery", 
    "jquery.mobile-1.4.2.min",
    "Globalize",
    "comhar-namespacing",
    "underscore",
    "chart-modules", 
    "dxAll",
    "json2csv",
    "dashboard",
    "highcharts-more",
    "angular",
    "angularSanitize", 
    "controller",
    "factories",
    "app"], function(jquery, jqueryMobile, Globalize, comharApp, _, chartModules, DevExpress, csvConverter, dashboard, highchartsMore, angular, angularSanitize, controller, factories, ComharNGApp) {
   
    angular.element(document).ready(function() {
      //Mobile loading is hidden in app/controller.js -- programCtrl
      $.mobile.loading("show");

      //Make Elements Visible right before Bootstrap Event
      angular.element('#form1').removeClass("no-js");
    
      //Put DevExpress themes before jQuery. 
      document.body.className = document.body.className.replace("dx-theme-generic dx-theme-generic-typography dx-color-scheme-light","");

      angular.bootstrap(document, ['ComharNGApp']);

      $(document).bind('mobileinit', function () {
        $.mobile.selectmenu.prototype.options.nativeMenu = false;
      });

      $('#download-CSV').click(function() {
        csvConverter.convert(comharApp.ActiveData);
      });

      //Resolves sidebar padding issue. 
      $('#leftPanel > .ui-panel-inner').css({'padding': '0em'});

    });
});