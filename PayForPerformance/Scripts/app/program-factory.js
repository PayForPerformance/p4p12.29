define(['angular', 'comhar-namespacing', 'addDataGrid'], function(angular, comharApp, Program) {
  var programInstance = angular.module('programInstance', []);

  programInstance.factory('programInstance', function() {
    
    return {
      newProgram : function(percentCompliant) {
        p = new Program(0, $('#gridContainer'));

        p.setGrid(comharApp.ActiveData)
        p.loadChart(percentCompliant);
      }
    }
  })
  return programInstance;
});