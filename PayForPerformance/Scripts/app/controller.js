define(['angular', 'comhar-namespacing', 'chart-modules', 'program-factory'], function(angular, comharApp, chartModules, programInstance) {
  var baseUrl = window.location.protocol + '//' + window.location.hostname + "/";

  var encounterDetailSourceUrl = "Scripts/encounterDetail.js";
  var summarySourceUrl = "Scripts/summary.js";
//  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
//  var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"

  var comharControllers = angular.module('comharControllers', ['dateLookup']);

  comharControllers.controller('comharCtrl', ['$scope', '$http', 'comharDataFunctions',


    function ($scope, $http, comharDataFunctions) {

      var summarySourceUrl = "Scripts/summary.js";
    //  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
      $http.get(summarySourceUrl).success(function(summaryData) {
        comharApp.KPIData = summaryData;
      });

    $http.get('Scripts/KPIInfo.js').success(function(data) {
      $scope.data = angular.fromJson(data);

      $scope.namesandIds = comharDataFunctions.getNamesAndIds(data);

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
          comharApp.charts.highCharts[functionName]($element, comharApp.KPIData);
        }
      }
    });
  }]);


  comharControllers.controller('programCtrl', ['comharDataFunctions', 'dateLookup', 'programInstance', '$scope', '$http', function (comharDataFunctions, dateLookup, programInstance, $scope, $http) {

    var encounterDetailSourceUrl = "Scripts/encounterdetail3.js";
//    var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"

      $http.get(encounterDetailSourceUrl).success(function(encounterData) {
        $http.get('Scripts/program.js').success(function(programs) {

          $scope.programs = angular.fromJson(programs);

          //Iterate over JSON, cache the EncounterData with new Date objects for Encounter Start / End Date. 
          comharApp.EncounterData = comharDataFunctions.fixDates(encounterData);

          //Instantiate new Program
          var percentCompliant = comharDataFunctions.findCompliancePercentage();
          programInstance.newProgram(percentCompliant);

          //Find data for second chart
          var complianceData = comharDataFunctions.getMonthlyCompliance();
         
          comharApp.charts.highCharts.tcmChart0102($('#chart-TCM-01-02'), complianceData);

          $.mobile.loading("hide");

          //set the 'ActiveData' cache based on selected year.
          comharDataFunctions.setActiveData();

          $scope.$on('Year Changed', function() {
            comharDataFunctions.setActiveData();
            percentCompliant = comharDataFunctions.findCompliancePercentage()
            programInstance.newProgram(percentCompliant);
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

  comharControllers.controller('gridCtrl', ['$scope', 'comharDataFunctions', 'programInstance', function($scope, comharDataFunctions, programInstance) {
    $scope.Text = 'Show Filters';
    $scope.RemoveText = 'Remove Filters';
    $scope.filterMenuData = ['Show Same Day Visits', 'Show All Visits Ending This Year'];
    $scope.filterSelect = function filterSelect(event) { 
      
      var text = event.itemData;

      comharDataFunctions.parseFilter(text);

      var percentCompliant = comharDataFunctions.findCompliancePercentage();
      programInstance.newProgram(percentCompliant);
    }

    $scope.removeFilters = function removeFilters() {
      comharDataFunctions.setActiveData();
      var percentCompliant = comharDataFunctions.findCompliancePercentage();
      programInstance.newProgram(percentCompliant);
    } 
  }]);

  return comharControllers;

});