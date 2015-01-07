var comharControllers = angular.module('comharControllers', []);

comharControllers.controller('comharCtrl', ['$scope', '$http',
  function ($scope, $http) {

  $http.get('Scripts/KPIInfo.js').success(function(data) {
    $scope.data = angular.fromJson(data);

    //TODO - FIXME / DISCUSS
    var programNames = [];
    $scope.data.forEach(function(item) {
      if (programNames.indexOf( item.KpiId ) === -1) {
        return programNames.push(item.KpiId);
      } 
    });

    var programIds = [];
    var last = 0;
     $scope.data.forEach(function(item) {
      if (item.P4PInfoId > last) {
        last = item.P4PInfoId;
        return programIds.push(item.P4PInfoId);
      } 
    });
    
    $scope.programNames = programNames;
    var namesandIds = [];
    for (var _i = 0; _i < programNames.length; _i++) {
      namesandIds.push({ 'programId' : programIds[_i], 'programName' : programNames[_i] }); 
    }

    //TODO FIXME
    //TEMPORARY REMOVE FIRST ELEMENT
    $scope.namesandIds = namesandIds.splice(1, namesandIds.length);

    });
    programIds = null;
    programNames = null;

    $scope.setSelectedId = function(id) {
      $scope.selectedId = id;

    };
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
      $rootScope.selected = $scope.years[0];

      $scope.setSelected = function(index) {
        $rootScope.selected = $scope.years[index];
      };
     

  });
}]);
