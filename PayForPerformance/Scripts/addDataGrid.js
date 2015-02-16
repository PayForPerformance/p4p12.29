comharApp.getMonthlyCompliance = function() {
  
  var currentYear = new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear();

  function parseData(year) {
    var totalVisitsPerMonth = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);
    var currentYearCompliance = Array.apply(null, new Array(12)).map(Number.prototype.valueOf,0);

    comharApp.EncounterData.forEach(function(item) {
      if (item.EncounterEndDate.getYear() === year ) {
        totalVisitsPerMonth[item.EncounterEndDate.getMonth()] += 1;
      }
      if ( item.ElapsedDays >= 31 && item.EncounterEndDate.getYear() === year ) {
        currentYearCompliance[item.EncounterEndDate.getMonth()] += 1;
      }

    });
    console.log(totalVisitsPerMonth)
    console.log(currentYearCompliance)
    percentOutOfCompliance = totalVisitsPerMonth.map(function(item, i) {
      if ( item !== 0 ) {
        return parseFloat((currentYearCompliance[i] / item * 100).toFixed(2));
      } else {
        return 0;
      }
    });
    return percentOutOfCompliance
  }

  var current = 1900 + currentYear;
  var prev = 1900 + (currentYear - 1);
  var yearInfo = {};
  yearInfo[current] = parseData(currentYear);
  yearInfo[prev] = parseData(currentYear - 1);
  return yearInfo;  
}

Array.zip = function(left, right, combinerFunction) {
  var counter, results = [];

  for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(combinerFunction(left[counter],right[counter]));
  }

  return results;
};

comharApp.parseFilter = function(text, callback) {
  console.log(text)
  switch(text) {
    case 'Filter Same Day Visits':
      comharApp.ActiveData = comharApp.filterSameDay();
      break;
    case 'Show All Visits Ending in Fiscal Year':
      comharApp.ActiveData = comharApp.filterEndYear();
      break;
  }
  callback();
};        
comharApp.fixDates = function fixDates(encounterData) {
  var betterDates;
  betterDates = encounterData.map(function (data) {
    data.EncounterStartDate = new Date(data.EncounterStartDate);
    data.EncounterEndDate = new Date(data.EncounterEndDate);
    return data;
  });
  return betterDates;
};

comharApp.filterEndYear = function filterYear() {
  return _.filter(comharApp.EncounterData, function(item) { return item.EncounterEndDate.getYear() === new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear() }); 
};

comharApp.filterCalendarYear = function() {
  var currentYear = new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear();
  return _.filter(comharApp.EncounterData, function(item) { 
    return item.EncounterEndDate.getYear() === currentYear && item.EncounterStartDate.getYear() === currentYear
  });
};

comharApp.filterSameDay = function filterSameDay() {
  var currentYear = new Date(comharApp.EncounterYear.FiscalYearEndDate).getYear();
  return _.filter(comharApp.ActiveData, function(item) { 
    return item.ElapsedDays > 0 
  });
};

function Program (number, dataGridContainer, dayInfo) {
  this.KPINUMBER = number;
  this.dataGridContainer = dataGridContainer;
  this.dayInfo = dayInfo || {};

  return this;
}



Program.prototype = {

  init : function init() {
    var elapsedMiliSeconds = this.calculateMiliSeconds();
    var totalDays = this.calculateElapsedDays(elapsedMiliSeconds);
    var greenPercent = this.calculatePercent('GreenTo');
    var yellowPercent = this.calculatePercent('YellowTo');
    var redPercent = this.calculatePercent('RedFrom');
   
    var greenDays = this.calculateDays(totalDays, greenPercent);
    var yellowDays = this.calculateDays(totalDays, yellowPercent);

    var redDays = this.calculateDays(totalDays, redPercent);

    this.dayInfo.greenDays = greenDays;
    this.dayInfo.yellowDays = yellowDays;
    this.dayInfo.redDays = redDays;
    return this;
  },

  yellowDays : function() {
    return this.dayInfo.yellowDays;
  },

  calculateMiliSeconds : function() {
    return new Date(comharApp.KPIData[this.KPINUMBER].FiscalYearEndDate) - new Date(comharApp.KPIData[this.KPINUMBER].FiscalYearStartDate);
  },

  calculateElapsedDays : function(miliSeconds) {
    return (miliSeconds / 86400000);
  },

  calculatePercentCompliant : function(numRecords, threshold) {
    // Find total number of records in data set that are above threshold e.g.
    // all records that are cointained in Yellow and Green Category, Divided by Total Number of Records Contained in Data Set. 
    var totalComplaint, compliantPercent, name = '';

    totalCompliant = 0;
    comharApp.ActiveData.forEach(function(item) {
      if (item.ElapsedDays < threshold) {
        totalCompliant += 1;
      }
    });

    compliantPercent = ( totalCompliant * (100 / numRecords) );
   
    return compliantPercent;
  },

  calculateDays : function(totalDays, percent) {
    return Math.floor(totalDays * percent);
  },

  calculatePercent : function(key) { 
    return (comharApp.KPIData[this.KPINUMBER][key] / 100);
  },

  colorData : function () {
    
    var $elements = this.dataGridContainer.find('.elapsedDays');

    var that = this;

    $elements.each(function (index) {

      if (index == 0)
        {
            return;
        }
      if ($(this).text() <= that.dayInfo.yellowDays) { //TODO- discuss renaming this. 
        
        $(this).css("background", "#ccff99");

      }
//      else if ($(this).text() > that.dayInfo.greenDays && $(this).text() <= that.dayInfo.yellowDays) {
//
//          $(this).css("background", "#ffff99");

//      }
      else {

          $(this).css("background", "#CC0000");
          $(this).css("color", "#ccff99");
      }
    });
  },
  setGrid : function(dataSet) {
    var _this = this;
    this.dataGridContainer.dxDataGrid({
      dataSource: dataSet,
      columns: [
        { dataField: 'Clinician' },
        { dataField: 'PatientId' },
        { dataField: 'PatientName' },
        { dataField: 'EncounterStartDate', format: 'shortDate', allowFiltering: true},
        { dataField: 'EncounterEndDate', format: 'shortDate', allowFiltering: true},
        { dataField: 'ElapsedDays', cssClass: 'elapsedDays'}
      ], 
      columnChooser: { enabled: true },
      filterRow: { visible: true },
      pager: { visible: true },
      paging: { pageSize: 7 },
      contentReadyAction: function() {
        _this.colorData();
      },
      width: function(){
        return "100%";
      }
    });
    return this;
  }, 
  loadChart : function () {
    var threshold = this.yellowDays();
    var numRecords = comharApp.ActiveData.length;
    var percentCompliant = this.calculatePercentCompliant(numRecords, threshold);

    //TODO TEMPORARY
    comharApp.KPIData[0].CompliancePercent = percentCompliant;
    comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), comharApp.KPIData);
    return this;
  }
}




