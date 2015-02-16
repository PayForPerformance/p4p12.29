define("addDataGrid", ['./comhar-namespacing', 'dxAll'], function() {
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
  return Program;
});