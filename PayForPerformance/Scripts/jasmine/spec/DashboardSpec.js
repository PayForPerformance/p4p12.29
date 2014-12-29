//Reference dashboard-1.0.0.js
jasmine.getFixtures().fixturesPath = '/';
describe("comharApp.fixDates()", function() {
  it("should return an array of fixed dates", function() {
    var encounterData = [{ "P4PSummaryId": 1, 
                            "ProgramName": "TCM", 
                            "KpiId": "TCM-01-01", 
                            "Clinician": "Nancy Jones", 
                            "PatientId": "101123", 
                            "PatientName": "Joe Balagio", 
                            "EncounterStartDate": "2014-01-05T00:00:00", 
                            "EncounterEndDate": "2014-02-10T00:00:00", 
                            "ElapsedDays": 34 
                            }]
    fixedDates = comharApp.fixDates(encounterData);
    expect(fixedDates[0].EncounterStartDate instanceof Date).toBe(true)

  });
});

describe("convertCSV", function() {
  encounterData = [{ "P4PSummaryId": 1, 
                            "ProgramName": "TCM", 
                            "KpiId": "TCM-01-01", 
                            "Clinician": "Nancy Jones", 
                            "PatientId": "101123", 
                            "PatientName": "Joe Balagio", 
                            "EncounterStartDate": "2014-01-05T00:00:00", 
                            "EncounterEndDate": "2014-02-10T00:00:00", 
                            "ElapsedDays": 34 
                            }]
  csvString = csvConverter.convertCSV(encounterData)
  it("should return a string", function() {
    
    expect(typeof csvString).toEqual("string")
  });
  it("the string returned should contain the Elapsed Days", function() {
    lastDay = csvString.split(",").pop().trim()
    expect(lastDay).toEqual("34")
  });
});
 

