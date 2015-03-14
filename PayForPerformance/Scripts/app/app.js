define(['dxAll', 'angular', 'angularSanitize','controller', 'factories', 'program-factory'], function(DevExpress, angular, angularSanitize, comharControllers, factories, programInstance) {

  var ComharNGApp;

  try {
    var dx = angular.module('dx')
    ComharNGApp = angular.module('ComharNGApp', ['dx','ngSanitize','comharFunctions','comharControllers', 'programInstance']);
  } catch (err) {
    console.log('Dev Express failed to initialize');
    console.log(err);
    //Attempt to load rest of ng-app. 
    ComharNGApp = angular.module('ComharNGApp', ['ngSanitize', 'comharFunctions', 'comharControllers', 'programInstance']);
      
  }

    ComharNGApp.directive('popoverClose', function() {
      //Related to jQuery mobile list. 
      return {
        link: function($scope, $element, $attrs) {
          $element.bind('click', function() {
            $element.parent().parent().popup('close');
          });
        }
      }
    });
 
    ComharNGApp.directive('jqueryCreate', function() {
      //Triggers create event for jQuery mobile. 
      return {
        link: function($scope, $element, $attr) {
          $element.parent().trigger('create');
          // new angular replacement - $element.enhanceWithin();
        }
      };
    });
  
    ComharNGApp.directive('firstKpi', function($compile) {
      //Compile the HTML for the first KPI
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
                                                  <div dx-button="{ text: RemoveText, onClick: removeFilters }"></div>\
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
      //Compile the HTML for the rest of the KPIs
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
  return ComharNGApp;
});