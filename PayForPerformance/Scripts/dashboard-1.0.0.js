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
   var encounterDetailSourceUrl = "Scripts/encounterDetail.js";
   var summarySourceUrl = "Scripts/summary.js";
//  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
//  var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"
    try {
        $.getJSON(summarySourceUrl, function (summaryData) {
           comharApp.KPIData = summaryData;

            $('#tcm-01-01').on('click', function () {
              $.getJSON(encounterDetailSourceUrl, function (encounterData) {

                var fixedDataSet = comharApp.fixDates(encounterData);
                var numRecords = encounterData.length;

                comharApp.encounterData = fixedDataSet;

                kpi1 = new setKPI(0, $('#gridContainer'));
                kpi1.init();

                kpi1.setGrid(fixedDataSet);

                var threshold = kpi1.yellowDays();
                var percentCompliant = kpi1.calculatePercentCompliant(numRecords, threshold);
                
                //TODO TEMPORARY
                summaryData[0].CompliancePercent = percentCompliant;

                setTimeout(function(){ //Color Data Initially
                   kpi1.colorData($('.elapsedDays'));
                  }, 1000);
                
                setTimeout(function () { //Delay until chart container is visible in DOM. 
                    comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), summaryData);

                }, 1);

                $('.dx-datagrid-action-cursor').on('click', function () {
                  setTimeout(function () {
                    kpi1.colorData();
                  }, 50);
                });

                $('.dx-pages').click(function (){ //Set Event Listener for Pagination
      
                  setTimeout(function() {
                    kpi1.colorData($('.elapsedDays'));  
                  }, 50);
                });
              
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
                  if ( id !== 1 ) window.comharApp.highCharts[functionName]($element, summaryData);
                } 
              });
           }, 1);
        });
    }
    catch (err)
    {
        console.log(err);
    }

});
