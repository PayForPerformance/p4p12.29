define(['angular', 'underscore', 'comhar-namespacing', 'addDataGrid'], function(angular, _, comharApp, Program) {

  Array.zip = function(left, right, combinerFunction) {
  //The zip function accepts a combiner function, traverses each array at the same time, 
  //and calls the combiner function on the current item on the left-hand-side and right-hand-side.
    var counter, results = [];

    for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
      results.push(combinerFunction(left[counter],right[counter]));
    }

    return results;
  };

  var comharDataFunctions = angular.module('comharFunctions', []);

    comharDataFunctions.factory('comharDataFunctions', function() {

      var COMPLIANCE_THRESHOLD = 31;

      function parseYear(year) {
        //Initialize two arrays of size 12 with 0s as their elements eg[0,0,0,0...]
        var totalVisitsPerMonth = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);
        var numberOverCompliance = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);

        comharApp.EncounterData.forEach(function(item) {
          if (item.EncounterEndDate.getFullYear() === year ) {
            totalVisitsPerMonth[item.EncounterEndDate.getMonth()] += 1;

            if ( item.ElapsedDays >= COMPLIANCE_THRESHOLD ) {
              numberOverCompliance[item.EncounterEndDate.getMonth()] += 1;
            }
          }
       });

      percentOutOfCompliance = totalVisitsPerMonth.map(function(item, i) {
        if ( item !== 0 ) {
          return parseFloat((numberOverCompliance[i] / item * 100).toFixed(2));
        } else {
          return 0;
        }
      });
      return percentOutOfCompliance;
    }

    return {

      findCompliancePercentage : function findCompliancePercentage() {
        //Iterate over the comharApp.ActiveData, find the percentage of visits that are in compliance,
        var greenTotal = 0;
        comharApp.ActiveData.forEach(function(item) {
          if ( item.ElapsedDays <= COMPLIANCE_THRESHOLD )
            greenTotal += 1;
        });
        var size = comharApp.ActiveData.length;
        var percent = greenTotal / size;

        return parseInt(percent * 100);
      },
      
      getMonthlyCompliance : function getMonthlyCompliance() {
        //Creates an object that contains two arrays that contain the percent of out of compliance visits for each month in
        //in currently selected year and previous year. 
        // E.g.
        // { 2013 : [1, 2, 3, 5, 1, 8, 9, 10, 11, 3, 14], 2012: [1, 2, 3, 5, 1, 8, 9, 10, 11, 3, 14] }
        var currentYear = new Date(comharApp.EncounterYear.FiscalYearEndDate).getFullYear();
        var prevYear = currentYear - 1;
        var yearInfo = {};
        yearInfo[currentYear] = parseYear(currentYear);
        yearInfo[prevYear] = parseYear(prevYear);
        return yearInfo; 
      },

      parseFilter : function parseFilter(text) {
        //Parse the Text and apply the proper filters. 
        switch(text) {
          case 'Show Same Day Visits':
            comharApp.ActiveData = this.filterCalendarYear();
          break;
          case 'Show All Visits Ending This Year':
            comharApp.ActiveData = this.filterYear();
          break;
        }
      },

      fixDates : function fixDates(encounterData) {
        //Replaces the stringified date in the JSON with a JavaScript Date object. 
        var betterDates;
        betterDates = encounterData.map(function (data) {
          data.EncounterStartDate = new Date(data.EncounterStartDate);
          data.EncounterEndDate = new Date(data.EncounterEndDate);
          return data;
        });
        return betterDates;
      },

      filterYear : function filterYear() {
        return _.filter(comharApp.EncounterData, function(item) { return item.EncounterEndDate.getYear() === new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear() }); 
      },

      filterCalendarYear : function() {
        var currentYear = new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear();
        return _.filter(comharApp.EncounterData, function(item) { 
          return item.EncounterEndDate.getYear() === currentYear && item.EncounterStartDate.getYear() === currentYear
        });
      },

      filterSameDay : function filterSameDay() {
        return _.filter(comharApp.ActiveData, function(item) { return item.ElapsedDays > 0 });
      },   

      getNamesAndIds : function(data) {
        //Used to pull the KPI id and Program name for div header.
        //E.G. TCM-04: Assesment and Service Delivery

        var programNames = _.uniq(data.map(function(item) { return item.KpiId; }));

        var programIds = _.uniq(data.map(function(item) { return item.P4PInfoId; }));

        var namesandIds = Array.zip(programIds, programNames, function(id, name) {
          return { 'programId' : id, 'programName' : name };
        });

        //FIXME
        //TEMPORARY REMOVE FIRST ELEMENT
        namesandIds = namesandIds.splice(1, namesandIds.length);
        return namesandIds;
      },
      setActiveData : function() {
        comharApp.ActiveData = this.filterCalendarYear();
        comharApp.ActiveData = this.filterSameDay();
      }
    }
  });

  var getEncounterData = angular.module('dateLookup', []);

  getEncounterData.factory('dateLookup', function($http, $rootScope) {
  //Handles broadcasting of the year change event to different scopes / controllers.  
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