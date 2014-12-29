// Reference Scripts/app/controller.js

describe('comharCtrl', function() {
  var $httpBackend;
  beforeEach(module('ComharNGApp'));

  var $controller;


  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));
    
  describe('Loading JSON', function() {
    it('Loads KPI JSON with a Title', function() {
      var $scope = {};
      var controller = $controller('comharCtrl', { $scope : $scope });
      $httpBackend.expectGET('Scripts/KPIInfo.js').respond({
        "P4PInfoId":1, 
        "ProgramName":"TCM", 
        "KpiId": "TCM-01-01:",
        "Heading": "Rationale", 
        "Text" : "To measure the continuity of service provided to CBH-funded TCM and ACT members."
      });
      $httpBackend.flush();
      expect($scope.data.Heading).toEqual("Rationale");
      
    });
   
    it('Loads Program JSON', function() {
      var $scope = {};
      var controller = $controller('programCtrl', { $scope : $scope });
      $httpBackend.expectGET('Scripts/program.js').respond({
      "ProgramId":5,"ProgramName":"TCM","ProgramAlias":"ETCM"
      });
      $httpBackend.flush();
      expect($scope.programs.ProgramName).toEqual("TCM");
    });
  });
});

describe('dateCtrl', function(){
  beforeEach(module('ComharNGApp'));

  var $controller, scope, $rootScope, $httpBackend;


  beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_
    $controller = $controller('dateCtrl', {$scope : scope});
    $httpBackend.expectGET('Scripts/DateLookup.js').respond([{"DataRangeKey":1,"DataRangeName":"2012","FiscalYearStartDate":"2012-01-01T00:00:00","FiscalYearEndDate":"2012-12-31T00:00:00"}, {"DataRangeKey":2,"DataRangeName":"2013","FiscalYearStartDate":"2013-01-01T00:00:00","FiscalYearEndDate":"2013-12-31T00:00:00"}]);
  }));

  describe('Setting The Right Program Date', function() {
    it('Sets the Initial Year Based on the JSON response', function() {
      $httpBackend.flush();
      expect(scope.selected.DataRangeName).toEqual('2012');
    });

    it('Sets the Correct Year Based on the response given to it', function() {
      $httpBackend.flush();
      scope.setSelected(1);
      expect(scope.selected.DataRangeName).toEqual('2013');
    });
  });
});