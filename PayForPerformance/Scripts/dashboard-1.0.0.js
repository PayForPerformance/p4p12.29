/// <reference path="dashboard-1.0.0.js" />
// JavaScript source code
define(['addDataGrid', 'comhar-namespacing', 'data-utilities', 'chart-modules'], function(Program, comharApp, dataUtils) {
 
  $(function () {
    $(document).bind('mobileinit', function () {
      $.mobile.selectmenu.prototype.options.nativeMenu = false;
    });


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
         
      });

    }
    catch (err)
    {
    console.log(err);
    }

  });
});
