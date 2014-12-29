var comharControllers = angular.module('comharControllers', []);

comharControllers.controller('comharCtrl', ['$scope', '$http',
  function ($scope, $http) {
  $http.get('Scripts/KPIInfo.js').success(function(data) {
    $scope.data = angular.fromJson(data);
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
      $rootScope.selected = $scope.years[0];

      $scope.setSelected = function(index) {
        $rootScope.selected = $scope.years[index];
      }
     

  });
}]);

