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
                console.log(numRecords);
                comharApp.encounterData = fixedDataSet;

                kpi1 = new setKPI(0, $('#gridContainer'));

                kpi1.setGrid(fixedDataSet);
                var elapsedMiliSeconds = kpi1.calculateMiliSeconds();
                var totalDays = kpi1.calculateElapsedDays(elapsedMiliSeconds);
                var greenPercent = kpi1.calculatePercent('GreenTo');
                var yellowPercent = kpi1.calculatePercent('YellowTo');
                var redPercent = kpi1.calculatePercent('RedFrom');
               
                var greenDays = kpi1.calculateDays(totalDays, greenPercent);
                var yellowDays = kpi1.calculateDays(totalDays, yellowPercent);
                var redDays = kpi1.calculateDays(totalDays, redPercent);

                kpi1.dayInfo.greenDays = greenDays;
                kpi1.dayInfo.yellowDays = yellowDays;
                kpi1.dayInfo.redDays = redDays;

                var percentCompliant = kpi1.calculatePercentCompliant(numRecords, yellowPercent);
                summaryData[0].CompliancePercent = (percentCompliant * 100)
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
     
                  var jsonString = JSON.stringify(encounterData);
                  var csvString = csvConverter.convertCSV(jsonString);
                  if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {  // Determine if client is IE11
         
                    var blob = new Blob([csvString],{
                      type: "text/csv;charset=utf-8;"
                    });
                    window.navigator.msSaveBlob(blob, "tcm-01.csv");

                  } else {

                    window.open("data:text/csv;charset=utf-8," + escape(csvString));
                  }
                });

                comharApp.highCharts.tcmChart0102($('#chart-TCM-01-02'), summaryData);
             });
               
            });

            $('#tcm-02-01').click(function () {
                comharApp.highCharts.tcmChart0201($('#chart-TCM-02-01'), summaryData);
            });

            $('#tcm-03-01').on('click', function () {
                comharApp.highCharts.tcmChart0301($('#chart-TCM-03-01'), summaryData);
            });
            $('#tcm-04-01').on('click', function () {
                comharApp.highCharts.tcmChart0401($('#chart-TCM-04-01'), summaryData);
            });
        });
    }
    catch (err)
    {
        console.log(err);
    }

});
