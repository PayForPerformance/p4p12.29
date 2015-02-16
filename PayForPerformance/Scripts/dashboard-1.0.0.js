/// <reference path="dashboard-1.0.0.js" />
// JavaScript source code
require(['addDataGrid', 'comhar-namespacing', 'data-utilities','dx.chartjs', 'dxAll'], function(Program) {
 
  $(function () {
    $(document).bind('mobileinit', function () {
      $.mobile.selectmenu.prototype.options.nativeMenu = false;
    });
    document.body.className = document.body.className.replace("dx-theme-generic dx-theme-generic-typography dx-color-scheme-light","");

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
              
                $.getJSON(encounterDetailSourceUrl, function (encounterData) {

                  var filterMenuData = ['Filter Same Day Visits', 'Limit to Start of Fiscal Year']
              
                  $('#dropDownMenu').dxDropDownMenu({
                    dataSource: filterMenuData,
                    buttonText: 'Add Filters',
                    buttonIcon: 'menu'
                  });

                  setTimeout(function() {
                    $('.dx-list-item').click(function() {
                    var t = $(this).text()
                    comharApp.DataModules.parseFilter(t, function() {
                      k = new Program(0, $('#gridContainer'));
                      k.init().setGrid(comharApp.ActiveData).loadChart();
                      });
                    });
                  }, 50);
           
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

          });
      }
      catch (err)
      {
          console.log(err);
      }
  });
});