define(['angular', 'underscore'], function(angular, _) {
  var comharFunctions = angular.module('comharFunctions', []);

    comharFunctions.factory('comharFunctions', function() {
      return {
        getNamesAndIds : function(data) {

          var programNames = _.uniq(data.map(function(item) { return item.KpiId; }));

          var programIds = _.uniq(data.map(function(item) { return item.P4PInfoId; }));

          var namesandIds = Array.zip(programIds, programNames, function(id, name) {
            return { 'programId' : id, 'programName' : name };
          });

          //TODO
          //TEMPORARY REMOVE FIRST ELEMENT
          namesandIds = namesandIds.splice(1, namesandIds.length);
          return namesandIds;
        }
      }
  });

  var getEncounterData = angular.module('dateLookup', []);

  getEncounterData.factory('dateLookup', function($http, $rootScope) {
    var rObj = {};
    rObj.years = [];
    rObj.selectedYear = null;
    rObj.getYears = function() {
        return $http.get('Scripts/DateLookup.js').success(function(data) {
          rObj.years = data;
          rObj.selectedYear = rObj.years[2];
        });
      }
     rObj.setSelected = function(index) {
        rObj.selectedYear = rObj.years[index];
        $rootScope.$broadcast('Year Changed');
      }
    
    return rObj;
  });

  
});