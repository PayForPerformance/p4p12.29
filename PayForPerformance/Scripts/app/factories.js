var comharFunctions = angular.module('comharFunctions', []);

comharFunctions.factory('comharFunctions', function() {
  return {
    getNamesAndIds : function(data) {

      var programNames = _.uniq(data.map(function(item) { return item.KpiId; }));

      var programIds = _.uniq(data.map(function(item) { return item.P4PInfoId; }));

      var namesandIds = [];
      for (var _i = 0; _i < programNames.length; _i++) {
        namesandIds.push({ 'programId' : programIds[_i], 'programName' : programNames[_i] }); 
      }

      //TODO
      //TEMPORARY REMOVE FIRST ELEMENT
      namesandIds = namesandIds.splice(1, namesandIds.length);
      return namesandIds;
    }
  }
});