define(['comhar-namespacing', 'dxAll'], function(comharApp, DevExpress) {
  
  function Program (number, dataGridContainer) {
    this.KPINUMBER = number;
    this.dataGridContainer = dataGridContainer;
    this.COMPLIANCE_THRESHOLD = 31;
    return this;
  }

  Program.prototype = {
    colorData : function () {
      
      var $elements = this.dataGridContainer.find('.elapsedDays');

      var _this = this;

      $elements.each(function (index) {

        if (index == 0)
        {
          return;
        }
        if ( $(this).text() === "" ) {

           $(this).css("background", "#ffffff");

        }
        else if ( $(this).text() <= _this.COMPLIANCE_THRESHOLD ) { 

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
          _this.addColumnChooserLabel();
        },
        width: function(){
          return "100%";
        }
      });
      return this;
    }, 
    loadChart : function (percentCompliant) {

      comharApp.KPIData[this.KPINUMBER].CompliancePercent = percentCompliant;
      comharApp.KPIData[this.KPINUMBER].GreenTo = percentCompliant;
      comharApp.charts.dxChart.tcmChart01($('#chart2-TCM-01-01'), comharApp.KPIData);
      return this;
    },
    addColumnChooserLabel : function() {
    var colLabel ='<p style="float:right; padding-left:22px;">Column Chooser:</p>';
    $colheader = $('.dx-datagrid-header-panel');
    if ( $colheader.children().length == 1 )
    //If 'Column Chooser' label does not exist, append one. 
      $colheader.append(colLabel);
    }
  }
 
  return Program;
});