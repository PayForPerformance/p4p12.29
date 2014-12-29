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

                fixedDataSet = comharApp.fixDates(encounterData);

                kpi1 = new setKPI(0, $('#gridContainer'));

                kpi1.setGrid();

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
