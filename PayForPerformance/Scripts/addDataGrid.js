comharApp.fixDates = function (encounterData) {
  var betterDates;
  betterDates = encounterData.map(function (data) {
    data.EncounterStartDate = new Date(data.EncounterStartDate);
    data.EncounterEndDate = new Date(data.EncounterEndDate);
    return data;
  });
  return betterDates;
};



function setKPI (number, dataGridContainer, dayInfo) {
  this.KPINUMBER = number;
  this.dataGridContainer = dataGridContainer;
  this.dayInfo = dayInfo || {};

  return this;
}

setKPI.prototype = {

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
    comharApp.encounterData.forEach(function(item) {
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
      if ($(this).text() <= that.dayInfo.greenDays) {
        
        $(this).css("background", "#ccff99");

      }
      else if ($(this).text() > that.dayInfo.greenDays && $(this).text() <= that.dayInfo.yellowDays) {

          $(this).css("background", "#ffff99");

      }
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
  }
}




