comharApp.fixDates = function (encounterData) {
  var betterDates;
  betterDates = encounterData.map(function (data) {
    data.EncounterStartDate = new Date(data.EncounterStartDate);
    data.EncounterEndDate = new Date(data.EncounterEndDate);
    return data;
  });
  return betterDates;
};



function setKPI (number, dataGridContainer) {
  this.KPINUMBER = number;
  this.dataGridContainer = dataGridContainer;
  this.dayInfo = {};
}

setKPI.prototype = {

  calculateMiliSeconds : function() {
  return new Date(comharApp.KPIData[this.KPINUMBER].FiscalYearEndDate) - new Date(comharApp.KPIData[this.KPINUMBER].FiscalYearStartDate);
  },

  calculateElapsedDays : function(miliSeconds) {
  return (miliSeconds / 86400000);
  },

  calculatePercentCompliant : function(numRecords, threshold) {
    var totalRecords, totalComplaint, compliantPercent;

    totalRecords = comharApp.EncounterData.length;

    totalCompliant = 0;
    comharApp.encounterData.forEach(function(item) {
      if (item.ElapsedDays <= threshold) {
        totalCompliant += 1;
      }
    });

    compliantPercent = (totalCompliant / numRecords);
    return compliantPercent;
  },

  calculateDays : function(totalDays, percent) {
    return Math.floor(totalDays * percent);
  },

  calculatePercent : function(key) { 
    return (comharApp.KPIData[this.KPINUMBER][key] / 100);
  },

  colorData : function (elements) {
    var $elements = elements;
    var that = this;

    $elements.each(function (index) {

      if (index == 0)
        {
            return;
        }
      if ($(this).text() <= that.dayInfo.greenDays) {
        
        $(this).css("background", "#ccff99");

      }
      else if ($(this).text() > that.dayInfo.greenDays && $(this).text() < that.dayInfo.redDays) {

          $(this).css("background", "#ffff99");

      }
      else {

          $(this).css("background", "#CC0000");
          $(this).css("color", "#ccff99");
      }
    });
  },

  setGrid : function(dataSet) {
    var that = this;
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
      that.colorData($('.elapsedDays'));
    },
    width: function(){
      return "100%";
    }
  });
  }
}




