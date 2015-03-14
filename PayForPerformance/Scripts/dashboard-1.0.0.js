///// <reference path="dashboard-1.0.0.js" />
//// JavaScript source code
//define(['jquery', 'json2csv','comhar-namespacing'], function($, csvConverter, comharApp) {
// 
//  $(function () {
//
//    //jQuery Event Listeners 
//
//    $(document).bind('mobileinit', function () {
//      $.mobile.selectmenu.prototype.options.nativeMenu = false;
//    });
//
//    var baseUrl = window.location.protocol + '//' + window.location.hostname + "/";
//    var encounterDetailSourceUrl = "Scripts/encounterDetail.js";
//    var summarySourceUrl = "Scripts/summary.js";
////  var summarySourceUrl = baseUrl + "PayForPerformanceWebApi/api/summary"
////  var encounterDetailSourceUrl = baseUrl + "PayForPerformanceWebApi/api/encounterDetail"
//
//    try {
//      $.getJSON(summarySourceUrl, function (summaryData) {
//        comharApp.KPIData = summaryData;
//      });
//
//    }
//    catch (err)
//    {
//    console.log(err);
//    }
//
//  });
//});
