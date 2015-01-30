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
        kpi1 = new Program(0, $('#gridContainer'));
        kpi1.init();
        comharApp.ActiveData = comharApp.filterYear();
        kpi1.setGrid(comharApp.ActiveData);
        comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), comharApp.summaryData);
        kpi1.loadChart();

      };
     

  });
}]);
