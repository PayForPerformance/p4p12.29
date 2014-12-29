comharApp.dxChart = {
  tcmChart01 : function (container, summaryData) {
    container.dxCircularGauge({
      scale: {
        startValue: 0, endValue: 100,
        majorTick: {
          color: '#536878',
          tickInterval: 10
        },
        label: {
          customizeText: function (arg) {
            return arg.valueText + ' %';
          },
          indentFromTick: 3
        }
      },
      rangeContainer: {
        offset: 10,
        ranges: [
        { startValue: summaryData[0]["RedFrom"], endValue: summaryData[0]["RedTo"], color: '#92000A' },
        { startValue: summaryData[0]["YellowFrom"], endValue: summaryData[0]["YellowTo"], color: '#E6E200' },
        { startValue: summaryData[0]["GreenFrom"], endValue: summaryData[0]["GreenTo"], color: '#77DD77' }
        ]
      },
      valueIndicator: {
        offset: 20,
      },
      subvalueIndicator: {
        offset: -25
      },
      title: {
        text: 'Blended Enhanced and ACT',
        font: { size: 28 }
      },
      subtitle: {
        text: 'Percent Compliant'
      },
      value: summaryData[3].CompliancePercent,
    });
  }
}


