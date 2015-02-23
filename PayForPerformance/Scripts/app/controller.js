define(['angular', 'addDataGrid', 'data-modules', 'comhar-namespacing','chart-modules'], function(angular, Program, dataUtilities, comharApp) {

  var comharControllers = angular.module('comharControllers', ['dateLookup']);

  comharControllers.controller('comharCtrl', ['$scope', '$http', 'comharFunctions',
    function ($scope, $http, comharFunctions) {

    $http.get('Scripts/KPIInfo.js').success(function(data) {
      $scope.data = angular.fromJson(data);

      $scope.namesandIds = comharFunctions.getNamesAndIds(data);

      $scope.setSelectedId = function(id) {
        $scope.selectedId = id;
      };

      $scope.triggerChart = function() {
        var id = $scope.selectedId;
        var functionName = "tcmChart0" + id;
        var element = "#chart-" + id;
        var $element = $(element);
        console.log(comharApp.charts)
        //TEMPORARY BUGFIX
        if ( id !== 1 ) { 
          comharApp.charts.highCharts[functionName]($element, comharApp.KPIData);
        }
      }
    });
  }]);


  comharControllers.controller('programCtrl', ['dateLookup','$scope', '$http', function (dateLookup, $scope, $http) {
      $http.get('Scripts/encounterDetail.js').success(function(encounterData) {
        $http.get('Scripts/program.js').success(function(programs) {

          $scope.programs = angular.fromJson(programs);
          var fixedDataSet = comharApp.DataModules.fixDates(encounterData);
          comharApp.EncounterData = fixedDataSet;

          comharApp.ActiveData = comharApp.DataModules.filterYear();

          p = new Program(0, angular.element('#gridContainer')).init().setGrid(comharApp.ActiveData).loadChart();
          comharApp.charts.dxChart.tcmChart01($('#chart2-TCM-01-01'), comharApp.KPIData);
          var complianceData = comharApp.DataModules.getMonthlyCompliance();
          comharApp.charts.highCharts.tcmChart0102($('#chart-TCM-01-02'), complianceData);



          $scope.$on('Year Changed', function() {
            comharApp.ActiveData = comharApp.DataModules.filterYear();
            program = new Program(0, $('#gridContainer'));
            program.init()
              .setGrid(comharApp.ActiveData)
              .loadChart();
            
            var complianceData = comharApp.DataModules.getMonthlyCompliance();
            comharApp.charts.highCharts.tcmChart0102(angular.element('#chart-TCM-01-02'), complianceData);
          });
            
        });
      });

  }]);


  comharControllers.controller('dateCtrl', ['dateLookup', '$scope',
    function (dateLookup, $scope, $http) {
      dateLookup.getYears().success(function() {
        $scope.years = dateLookup.years;
        $scope.selected = $scope.years[2];
      }); 
      $scope.$on('Year Changed', function() {
        $scope.selected = dateLookup.selectedYear;
        comharApp.EncounterYear = $scope.selected;
      }); 
  }]);

  comharControllers.controller('dateList', ['dateLookup', '$scope', 
    function(dateLookup, $scope, $http) {
       dateLookup.getYears().success(function() {
        $scope.years = dateLookup.years;
      });
    $scope.setSelected = dateLookup.setSelected;
  }]);

  comharControllers.controller('gridCtrl', ['$scope', function($scope) {
    $scope.Text = 'Show Filters';
    $scope.filterMenuData = ['Filter Same Day Visits', 'Limit to Start of Fiscal Year'];
    $scope.filterSelect = function filterSelect(event) { 
      
      var text = event.itemData;

      comharApp.DataUtilities.parseFilter(text, function() {

        k = new Program(0, $('#gridContainer'));
        k.init().setGrid(comharApp.ActiveData).loadChart();

      });
    }
  }]);

  return comharControllers;

});