require(['addDataGrid', 'data-utilities', 'dxAll'], function(Program) {
  var comharControllers = angular.module('comharControllers', []);

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
        //TEMPORARY BUGFIX
        if ( id !== 1 ) { 
          window.comharApp.highCharts[functionName]($element, comharApp.KPIData);
        }
      }
    });
  }]);


  comharControllers.controller('programCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('Scripts/encounterDetail.js').success(function(encounterData) {
        $http.get('Scripts/program.js').success(function(programs) {
          $scope.programs = angular.fromJson(programs);
          var fixedDataSet = comharApp.DataModules.fixDates(encounterData);
          comharApp.EncounterData = fixedDataSet;

          comharApp.ActiveData = comharApp.DataModules.filterYear();

          p = new Program(0, angular.element('#gridContainer')).init().setGrid(comharApp.ActiveData).loadChart();
       
          

          comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), comharApp.KPIData);
          var complianceData = comharApp.DataModules.getMonthlyCompliance();
          comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), complianceData);
          });
        });

  }]);


  comharControllers.controller('dateCtrl', ['$rootScope', '$scope', '$http',
    function ($rootScope, $scope, $http) {

    $http.get('Scripts/DateLookup.js').success(function(data) {
      
      $scope.years = angular.fromJson(data);
      $scope.selected = $scope.years[2];

      $scope.$watch('selected', function(oldVal, newVal) {
        if (oldVal !== newVal) {
          $scope.selected = newVal;
        }
      });
      $scope.setSelected = function(index) {
        $scope.selected = $scope.years[index];

//        comharApp.EncounterYear = _this.selected;
//        comharApp.ActiveData = comharApp.DataModules.filterYear();
//        program = new Program(0, $('#gridContainer'));
//        program.init()
//               .setGrid(comharApp.ActiveData)
//               .loadChart();
//        var complianceData = comharApp.DataModules.getMonthlyCompliance();
//        comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), complianceData);

      };
    });
  }]);

});

