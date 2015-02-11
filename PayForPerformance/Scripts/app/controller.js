var comharControllers = angular.module('comharControllers', []);

comharControllers.controller('comharCtrl', ['$scope', '$http', 'comharFunctions',
  function ($scope, $http, comharFunctions) {

  $http.get('Scripts/KPIInfo.js').success(function(data) {
    $scope.data = angular.fromJson(data);

    $scope.namesandIds = comharFunctions.getNamesAndIds(data);

    $scope.setSelectedId = function(id) {
      $scope.selectedId = id;
    };
  });
}]);


comharControllers.controller('programCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('Scripts/program.js').success(function(programs) {
      $scope.programs = angular.fromJson(programs);
    });

}]);

comharControllers.controller('dateCtrl', ['$rootScope', '$scope', '$http',
  function ($rootScope, $scope, $http) {

    $http.get('Scripts/DateLookup.js').success(function(data) {
      
      $scope.years = angular.fromJson(data);
      $rootScope.selected = $scope.years[2];


      $scope.setSelected = function(index) {
        $rootScope.selected = $scope.years[index];
        comharApp.EncounterYear = $rootScope.selected;
        comharApp.ActiveData = comharApp.filterYear();
        program = new Program(0, $('#gridContainer'));
        program.init()
               .setGrid(comharApp.ActiveData)
               .loadChart();
        var complianceData = comharApp.getMonthlyCompliance();
        comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), complianceData);

      };
  });
}]);
