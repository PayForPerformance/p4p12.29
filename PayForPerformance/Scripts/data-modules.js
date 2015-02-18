require(['comhar-namespacing'], function() {
  Array.zip = function(left, right, combinerFunction) {
    var counter, results = [];

    for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
      results.push(combinerFunction(left[counter],right[counter]));
    }

    return results;
  };

  comharApp.DataUtilities = (function() {
     function parseData(year) {
      //Initialize two arrays of size 12 with 0s as their elements eg[0,0,0,0...]
      var totalVisitsPerMonth = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);
      var numberOverCompliance = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);

      comharApp.EncounterData.forEach(function(item) {
        if (item.EncounterEndDate.getYear() === year ) {
          totalVisitsPerMonth[item.EncounterEndDate.getMonth()] += 1;

          if ( item.ElapsedDays >= 31 ) {
            numberOverCompliance[item.EncounterEndDate.getMonth()] += 1;
          }
        }
      });

      percentOutOfCompliance = totalVisitsPerMonth.map(function(item, i) {
        if ( item !== 0 ) {
          return parseFloat((numberOverCompliance[i] / item * 100).toFixed(2));
        } else {
          return 0; //prevent NaN
        }
      });
      return percentOutOfCompliance
    }

    function yearToDate(year) {
      //
      var now = new Date();

      var start = new Date(now.getFullYear(), 0, 1);
      var yearStart = new Date(year, 0, 1);
      var diff = now - start;
      var daysSinceYearStart = Math.floor(diff / 86400000);
      var totalOver = 0;
      comharApp.EncounterData.forEach(function(item) {
        if ( item.EncounterEndDate.getFullYear() === year ) {
          var daysSinceEncounterEnd = Math.floor( (item.EncounterEndDate - yearStart) / 86400000 ) 
          console.log(daysSinceEncounterEnd)
          if ( daysSinceEncounterEnd <= daysSinceYearStart && item.ElapsedDays >= 31 ) {
            totalOver += 1;
          }
        }
      });
      return totalOver;
    }

    return {
      getMonthlyCompliance : function() {
        var currentYear = new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear();
        var current = 1900 + currentYear;
        var prev = 1900 + (currentYear - 1);
        var yearInfo = {};
        yearInfo[current] = parseData(currentYear);
        yearInfo[prev] = parseData(currentYear - 1);
        return yearInfo; 
      },
      parseFilter : function(text, callback) {
        console.log(text);
        switch(text) {
          case 'Filter Same Day Visits':
            comharApp.ActiveData = this.filterSameDay();
          break;
          case 'Limit to Start of Fiscal Year':
            comharApp.ActiveData = this.filterCalendarYear();
          break;
        }
        callback();
      },

      fixDates : function fixDates(encounterData) {
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
        return _.filter(comharApp.ActiveData, function(item) { 
          return item.EncounterEndDate.getYear() === currentYear && item.EncounterStartDate.getYear() === currentYear
        });
      },
      filterSameDay : function filterSameDay() {
        return _.filter(comharApp.ActiveData, function(item) { return item.ElapsedDays > 0 });
      }
         
    }
  })();
  return comharApp.DataUtilities
});



     


