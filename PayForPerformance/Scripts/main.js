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
        deps: ['jquery', 'dxWebApps', 'jquery.mobile-1.4.2.min'],
        exports: 'angular'
      },
      highcharts: {
        deps: ['jquery'],
        exports: "Highcharts"
      },
      dxAll: {
        deps: ['Globalize', 'jquery']
      },
      dxChartJs: {
        deps: ['jquery', 'Globalize'],
        export: 'dxChartjs'
      },
      angularSanitize: {
        deps: ['angular'],
      },
      angularAMD: ['angular'],
      app: {
        deps: ['angular', 'angularSanitize', 'factories', 'controller']
      },
      factories: {
        deps: ['angular'] 
      },
      controller: {
        deps: ['angular']
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
     
        "jquery": "jquery-2.1.1.min",
        "Globalize": "globalize.min",
        "underscore": "underscore.min",
        "angular": "angular-1.3.5.min",
        "angularSanitize": "./angular-sanitize.min",
        "app": "./app/app",
        "controller": "./app/controller",
        "factories": "./app/factories",
    },

});

require(["jquery", 
    "jquery.mobile-1.4.2.min",
    "comhar-namespacing", 
    "addDataGrid", 
    "dashboard-1.0.0",
    "highcharts", 
    "highcharts-more", 
    "chart-modules", 
    "data-utilities", 
    "Globalize", 
    "dxAll",
    "underscore",
    "json2csv",
    "angular",
    "angularSanitize", 
    "controller",
    "factories",
    "app"], function(comharNamespacing, addDataGrid, Highcharts, highchartsMore, chartModules, dataUtilities, Globalize, dxAll,  _, Highcharts) {
   
    document.body.className = document.body.className.replace("no-js","");
    document.body.className = document.body.className.replace("dx-theme-generic dx-theme-generic-typography dx-color-scheme-light","");
});
