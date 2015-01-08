var comharFunctions = angular.module('comharFunctions', []);

comharFunctions.factory('comharFunctions', function() {
  return {
    getNamesAndIds : function(data) {
      var programNames = [];
      data.forEach(function(item) {
        if (programNames.indexOf( item.KpiId ) === -1) {
          return programNames.push(item.KpiId);
        } 
      });

      var programIds = [];
      var last = 0;
       data.forEach(function(item) {
        if (item.P4PInfoId > last) {
          last = item.P4PInfoId;
          return programIds.push(item.P4PInfoId);
        } 
      });
      var namesandIds = [];
      for (var _i = 0; _i < programNames.length; _i++) {
        namesandIds.push({ 'programId' : programIds[_i], 'programName' : programNames[_i] }); 
      }

      //TODO FIXME
      //TEMPORARY REMOVE FIRST ELEMENT
      namesandIds = namesandIds.splice(1, namesandIds.length);
      return namesandIds;
    }
  }
});