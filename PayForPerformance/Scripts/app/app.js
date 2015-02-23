define(['dxAll', 'angular', 'angularSanitize','controller', 'factories'], function(DevExpress, angular, angularSanitize, comharControllers, factories) {

  var ComharNGApp = angular.module('ComharNGApp', ['dx','ngSanitize','comharFunctions','comharControllers']);

  ComharNGApp.directive('popoverClose', function() {
    return {
      link: function($scope, $element, $attrs) {
        $element.bind('click', function() {
          $element.parent().parent().popup('close');
        });
      }
    }
  });
  ComharNGApp.directive('collapseOpen', function() {
    return {
      link: function($scope, $element, $attrs) {
        console.log($attrs)
      }
    }
  });

  ComharNGApp.directive('jqueryCreate', function() {
   return {
     link: function($scope, $element, $attr) {
        console.log('jquery create')
        $element.parent().trigger('create');
      }
    };
  });
  ComharNGApp.directive('jqueryTrigger', function() {
   return {
     link: function($scope, $element, $attr) {
          
            console.log('EnhanceWithin')
            $element.enhanceWithin();
          

      }
    };
  });
  ComharNGApp.directive('firstKpi', function($compile) {
    return {
      link: function($scope, $element, $attr) {
        var template = '<div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false" data-theme="b" data-content-theme="a" jquery-create>\
                        <h3 id="tcm-01-01" class="kpiContainer">TCM 01:Service Delivery and Continuity of Care</h3>\
                            <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">\
                                <h3>Percent of authorizations having at least one 31 day gap between services</h3>\
                                <div class="ui-grid-a ui-responsive">\
                                    <div class="ui-block-a">\
                                        <div class="ui-bar ui-bar-a" style="background-color:white;">\
                                            <div id="chart2-TCM-01-01" class="kpiChart"></div>\
                                        </div>\
                                    </div>\
                                        <div class="ui-block-b">\
                                            <div class="ui-bar ui-bar-c" >\
                                                <div data-role="collapsible" ng-repeat ="item in data | limitTo : 8" jquery-create>\
                                                    <h1>{{ item.Heading }}</h1>\
                                                    <p>{{ item.Text }}</p>\
                                                </div>\
                                            </div>\
                                    </div>\
                                </div>\
                                <div data-role="collapsible">\
                                    <h3>Encounter Details</h3>\
                                    <div id="gridContainer" class="gridContainer" style="width:100%; height:auto;"></div>\
                                    <div style="height:60px; width:100%" ng-controller="gridCtrl">\
                                        <ul class="filter-buttons">\
                                            <li>\
                                                <div style="max-width:200px" dx-drop-down-menu="{  dataSource: filterMenuData, buttonText: Text, itemClickAction: filterSelect }"></div>\
                                            </li>\
                                            <li>\
                                                <div id="remove-visit-filter" style="max-width:200px"></div>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                    <div style="width:100%">\
                                        <center><button id="download-CSV" type="submit" style="max-width:400px;">Download as CSV</button></center>\
                                    </div>\
                                </div>\
                            </div>\
                            <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">\
                                <h3>Change in percent of authorizations with at least one 31 day gap in service in the reporting period</h3>\
                                <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">\
                                    <div class="ui-grid-a ui-responsive">\
                                        <div class="ui-block-a">\
                                            <div class="ui-bar ui-bar-a" style="background-color:white;">\
                                                <div id="chart-TCM-01-02" class="kpiChart"></div>\
                                            </div>\
                                        </div>\
                                        <div class="ui-block-b" >\
                                            <div class="ui-bar ui-bar-c" >\
                                                <div data-role="collapsible" ng-repeat ="item in data | limitTo : 8" jquery-create>\
                                                    <h1>{{ item.Heading }}</h1>\
                                                    <p>{{ item.Text }}</p>\
                                                </div>\
                                            </div>\
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
//   
  ComharNGApp.directive('testKpi', function($compile) {
    return {
      link: function($scope, $element, $attr) {
      var template = '<div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="true" data-theme="b" data-content-theme="a">\
                        <h3 ng-click="setSelectedId(kpi.programId);triggerChart()" id="container-{{ kpi.programId }}" class="kpiContainer"> {{ kpi.programName }}</h3>\
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

  return ComharNGApp
});


