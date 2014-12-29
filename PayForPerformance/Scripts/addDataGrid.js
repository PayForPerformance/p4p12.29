comharApp.fixDates = function (encounterData) {
  betterDates = encounterData.map(function (data) {
    data["EncounterStartDate"] = new Date(data["EncounterStartDate"]);
    data["EncounterEndDate"] = new Date(data["EncounterEndDate"]);
    return data;
  });
  return betterDates;
};



function setKPI (number, dataGridContainer) {
  this.KPINUMBER = number;
  this.dataGridContainer = dataGridContainer;
}

setKPI.prototype = {

  calculateMiliSeconds : function() {
  return new Date(comharApp.KPIData[this.KPINUMBER].FiscalYearEndDate) - new Date(comharApp.KPIData[this.KPINUMBER].FiscalYearStartDate);
  },

  calculateElapsedDays : function(miliSeconds) {
  return (miliSeconds / 86400000);
  },

  colorData : function (elements) {
    
    var elapsedMiliSeconds = this.calculateMiliSeconds();
    var totalDays = this.calculateElapsedDays(elapsedMiliSeconds);

    var greenPercent = (comharApp.KPIData[this.KPINUMBER].GreenTo / 100);
    var yellowPercent = (comharApp.KPIData[this.KPINUMBER].YellowTo / 100);
    var redPercent = (comharApp.KPIData[this.KPINUMBER].RedFrom / 100);
    var greenDays = Math.floor(totalDays * greenPercent);
    var yellowDays = Math.floor(totalDays * yellowPercent);
    var redDays = Math.floor(totalDays * redPercent);

    var $elements = elements;

    $elements.each(function (index) {

      if (index == 0)
        {
            return;
        }
      if ($(this).text() <= greenDays) {
        
        $(this).css("background", "#ccff99");

      }
      else if ($(this).text() > greenDays && $(this).text() < redDays) {

          $(this).css("background", "#ffff99");

      }
      else {

          $(this).css("background", "#CC0000");
          $(this).css("color", "#ccff99");
      }
    });
  },

  setGrid : function() {
    var that = this;
    this.dataGridContainer.dxDataGrid({
    dataSource: fixedDataSet,
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




