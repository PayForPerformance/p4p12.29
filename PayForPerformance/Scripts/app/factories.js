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