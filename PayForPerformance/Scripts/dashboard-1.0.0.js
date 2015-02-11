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

           $('#leftPanel > .ui-panel-inner').css({'padding': '0em'});
           comharApp.KPIData = summaryData;
         
           $('#remove-visit-filter').dxButton({
            text: 'Remove Filters'
           });

            $('#tcm-01-01').on('click', function () {
              $.getJSON(encounterDetailSourceUrl, function (encounterData) {

                var fixedDataSet = comharApp.fixDates(encounterData);
                comharApp.EncounterData = fixedDataSet;
                comharApp.ActiveData = comharApp.filterYear();
           
                kpi1 = new Program(0, $('#gridContainer'));
                kpi1.init()
                    .setGrid(comharApp.ActiveData)
                    .loadChart();
                comharApp.dxChart.tcmChart01($('#chart2-TCM-01-01'), comharApp.KPIData);

                var filterMenuData = ['Filter Same Day Visits', 'Limit to Start of Fiscal Year']
            
                $('#dropDownMenu').dxDropDownMenu({
                  dataSource: filterMenuData,
                  buttonText: 'Add Filters',
                  buttonIcon: 'menu'
                });

                setTimeout(function() {
                  $('.dx-list-item').click(function() {
                  t = $(this).text()
                  comharApp.parseFilter(t, function() {
                    k = new Program(0, $('#gridContainer'));
                    k.init().setGrid(comharApp.ActiveData).loadChart();
                    });
                  });
                }, 50);
         
                $('#remove-visit-filter').click(function() {
                  k = new Program(0, $('#gridContainer'));
                  comharApp.ActiveData = comharApp.filterYear();
                  k.init().setGrid(comharApp.ActiveData).loadChart();
                });

                $('#download-CSV').click(function() {
                  csvConverter.convert(comharApp.ActiveData);
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
