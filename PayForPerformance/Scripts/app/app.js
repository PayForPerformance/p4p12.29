var ComharNGApp = angular.module('ComharNGApp', ['ngSanitize','comharFunctions','comharControllers', ]);


ComharNGApp.directive('popoverClose', function() {
  return {
    link: function($scope, $element, $attrs) {
      $element.bind('click', function() {
        $element.parent().parent().popup('close');
      });
    }
  }
});

ComharNGApp.directive('jqueryCreate', function() {
 return {
   link: function($scope, $element, $attr) {
      $element.parent().trigger('create');
    }
  };
});

ComharNGApp.directive('jqueryTwo', function() {
 return {
   link: function($scope, $element, $attr) {
      $element.trigger('create');
    }
  };
});


ComharNGApp.directive('testKpi', function($compile) {
  return {
    link: function($scope, $element, $attr){
    var template = '<div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="true" data-theme="b" data-content-theme="a">\
                     <h3 ng-click="setSelectedId(kpi.programId)" id="container-{{ kpi.programId }}" class="kpiContainer"> {{ kpi.programName }}</h3>\
                     <div data-role="collapsible" data-collapsed-icon="arrow-r" data-theme="b" data-collapsed="false" jquery-create>\
                     <h3>Percent having a TCM contact within 2 days of inpatient admission</h3>\
                     <div class="ui-grid-a ui-responsive">\
                     <div class="ui-block-a" >\
                     <div class-"ui-bar ui-bar-a" style="background-color:white;" jqeury-create>\
                     <div id="chart-{{ kpi.programId }}" class="kpiChart"></div>\
                     </div>\
                     </div>\
                     <div class="ui-block-b">\
                     <div class="ui-bar ui-bar-c">\
                     <div data-role="collapsible" ng-repeat ="item in data | filter: {  P4PInfoId : selectedId }" jquery-create>\
                     <h3>{{ item.Heading }}</h3>\
                     <p>{{ item.Text }}</p>\
                     </div>\
                     </div>\
                     </div>\
                     </div>\
                     </div>';
                   

      var linkFn = $compile(template);
      var content = linkFn($scope);
      $element.append(content);
    } 
  }
});

