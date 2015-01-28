/// <reference path="dashboard-1.0.0.js" />
// JavaScript source code

$(function () {

  $(document).bind('mobileinit', function () {
    $.mobile.selectmenu.prototype.options.nativeMenu = false;
  });

  $(".fiscalYearListItem").click(function () {
    var test = this;
    $('.fiscalYearLabel').text($(this).text());
    $('#fiscalYearPopup').popup("close");

  });

   var baseUrl = window.location.protocol + '//' + window.location.hostname + "/";
   var encounterDetailSourceUrl = "Scripts/encounterDetail2.js";
   var summarySourceUrl = "Scripts/summary.js";
//  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
//  var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"
    try {
        $.getJSON(summarySourceUrl, function (summaryData) {
           $('#leftPanel > .ui-panel-inner').css({'padding': '0em'});
           comharApp.KPIData = summaryData;
           $('#add-visit-filter').dxButton({
            text: 'Filter Same Day Visists',
           });
           $('#remove-visit-filter').dxButton({
            text: 'Remove Filter'
           });
           $('#add-visit-filter').click(function() {
            var dataGrid = $('#gridContainer').dxDataGrid('instance');
            dataGrid.filter(['ElapsedDays', '>', 1]);
            comharApp.EncounterDataFilter = true;
           });
           $('#remove-visit-filter').click(function() {
            var dataGrid = $('#gridContainer').dxDataGrid('instance');
            dataGrid.clearFilter();
            comharApp.EncounterDataFilter = false;
           });
            $('#tcm-01-01').on('click', function () {
              $.getJSON(encounterDetailSourceUrl, function (encounterData) {

                var fixedDataSet = comharApp.fixDates(encounterData);
                var numRecords = encounterData.length;

                comharApp.encounterData = fixedDataSet;

                kpi1 = new setKPI(0, $('#gridContainer'));
                kpi1.init();
                filteredData = comharApp.filterYear();
                kpi1.setGrid(filteredData);
              
                var threshold = kpi1.yellowDays();
                var percentCompliant = kpi1.calculatePercentCompliant(numRecords, threshold);
                
                //TODO TEMPORARY
                summaryData[0].CompliancePercent = percentCompliant;

                comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), summaryData);

   
               $('#download-CSV').click(function() {
                  csvConverter.convert(encounterData);
                });

                comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), summaryData);
             });
               
            });

            setTimeout(function() {
              $('.kpiContainer').on('click', function (event) {
                // Ensure that ID is returned 
                var id = $(this).attr('id').split("-").pop();
                id = parseInt(id);
                var re = /\d/;

                if ( re.test(id) ) {
                  var functionName = "tcmChart0" + id;
                  var element = "#chart-" + id;
                  var $element = $(element);
                  //TEMPORARY BUGFIX
                  if ( id !== 1 ) { 
                    window.comharApp.highCharts[functionName]($element, summaryData);
                  }
                } 
              });
           }, 50);
        });
    }
    catch (err)
    {
        console.log(err);
    }

});
