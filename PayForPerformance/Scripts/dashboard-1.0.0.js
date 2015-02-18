/// <reference path="dashboard-1.0.0.js" />
// JavaScript source code
require(['addDataGrid', 'comhar-namespacing', 'data-utilities'], function(Program, comharNamespacing, dataUtils) {
 
  $(function () {
    $(document).bind('mobileinit', function () {
      $.mobile.selectmenu.prototype.options.nativeMenu = false;
    });
    document.body.className = document.body.className.replace("dx-theme-generic dx-theme-generic-typography dx-color-scheme-light","");

    var baseUrl = window.location.protocol + '//' + window.location.hostname + "/";
    var encounterDetailSourceUrl = "Scripts/encounterDetail.js";
    var summarySourceUrl = "Scripts/summary.js";
//  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
//  var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"
    try {
      $.getJSON(summarySourceUrl, function (summaryData) {

        $('#leftPanel > .ui-panel-inner').css({'padding': '0em'});
        comharApp.KPIData = summaryData;

        $('#remove-visit-filter').dxButton({
          text: 'Remove Filters'
        });

        $('#remove-visit-filter').click(function() {
          k = new Program(0, $('#gridContainer'));
          comharApp.ActiveData = comharApp.DataModules.filterYear();
          k.init().setGrid(comharApp.ActiveData).loadChart();
        });

        $('#download-CSV').click(function() {
          csvConverter.convert(comharApp.ActiveData);
        });

        var complianceData = comharApp.DataModules.getMonthlyCompliance();
        comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), complianceData);
      });

    }
    catch (err)
    {
    console.log(err);
    }

  });
});
