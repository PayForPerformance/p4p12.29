define(function() {
  var comharApp = window.comharApp || {};
  comharApp.charts = comharApp.charts || {};
  comharApp.KPIData = comharApp.KPIData || [];
  comharApp.ActiveData = comharApp.ActiveData || [];
  comharApp.EncounterData = comharApp.EncounterData || [];
  comharApp.EncounterYear = comharApp.EncounterYear || { FiscalYearStartDate: "2014-01-01T00:00:00", FiscalYearEndDate: "2014-12-31T00:00:00"};
  comharApp.DataUtilities = {};
  return comharApp
});