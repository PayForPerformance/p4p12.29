﻿define(["comhar-namespacing", "highcharts"], function(comharApp, Highcharts) {
  comharApp.charts.highCharts = {
    tcmChart0102: function (container, complianceData) {
      var years = Object.keys(complianceData)

      container.highcharts({
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Comparison between Years'
          },
          subtitle: {
              text: 'Variation between years in compliance.'
          },
          xAxis: {
              categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              title: {
                  text: null
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Percentage of visits with at least a 31 day gap.',
                  align: 'high'
              },
              labels: {
                  overflow: 'justify'
              }
          },
          tooltip: {
              valueSuffix: ' percent'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }

              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -05,
              y: 60,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true
          },
          credits: {
              enabled: false
          },
          series: [{
              name: years[0],
              data: complianceData[years[0]], 
              color: '#C4D3F3' 
          }, {
              name: years[1],
              data: complianceData[years[1]],
              color: '#4f8700'
          }]
      });
  },

  tcmChart02: function (container, summaryData) {
    container.highcharts({
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },

      title: {
        text: 'Blended Enhanced and Act'
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
            [0, '#FFF'],
            [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
            [0, '#333'],
            [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
                      // default background
          }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
          }]
        },

              // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: summaryData[1].KpiId
        },
        plotBands: [{
          from: summaryData[1].GreenFrom,
          to: summaryData[1].GreenTo,
              color: '#55BF3B' // green
            }, {
              from: summaryData[1].YellowFrom,
              to: summaryData[1].YellowTo,
              color: '#DDDF0D' // yellow
            }, {
              from: summaryData[1].RedFrom,
              to: summaryData[1].RedTo,
              color: '#DF5353' // red
            }]
          },

          series: [{
            name: 'Speed',
            data: [summaryData[1].CompliancePercent],
            tooltip: {
              valueSuffix: ' P4P'
            }
          }]
    });
  },

  tcmChart03: function (container, summaryData) {
    container.highcharts({

    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },

    title: {
      text: 'Blended Enhanced'
    },

    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [{
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
          [0, '#FFF'],
          [1, '#333']
          ]
        },
        borderWidth: 0,
        outerRadius: '109%'
      }, {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
          [0, '#333'],
          [1, '#FFF']
          ]
        },
        borderWidth: 1,
        outerRadius: '107%'
      }, {
                      // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

  // the value axis
    yAxis: {
      min: 0,
      max: 100,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto'
      },
      title: {
        text: summaryData[2].KpiId
      },
      plotBands: [{
        from: summaryData[2].GreenFrom,
        to: summaryData[2].GreenTo,
            color: '#55BF3B' // green
          }, {
            from: summaryData[2].YellowFrom,
            to: summaryData[2].YellowTo,
            color: '#DDDF0D' // yellow
          }, {
            from: summaryData[2].RedFrom,
            to: summaryData[2].RedTo,
            color: '#DF5353' // red
          }]
        },

        series: [{
          name: 'Compliance: ',
          data: [summaryData[2].CompliancePercent],
          tooltip: {
            valueSuffix: '%'
          }
        }]

    });

  },

    tcmChart04: function (container, summaryData) {

    container.highcharts({

    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },

    title: {
      text: 'Blended Enhanced'
    },

    pane: {
      startAngle: -150,
      endAngle: 150,
      background: [{
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
          [0, '#FFF'],
          [1, '#333']
          ]
        },
        borderWidth: 0,
        outerRadius: '109%'
      }, {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
          [0, '#333'],
          [1, '#FFF']
          ]
        },
        borderWidth: 1,
        outerRadius: '107%'
      }, {
                      // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

  // the value axis
    yAxis: {
      min: 0,
      max: 100,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto'
      },
      title: {
        text: summaryData[4].KpiId
      },
      plotBands: [{
            from: summaryData[4].RedTo,
            to: summaryData[4].RedFrom,
            color: '#DF5353' // red
       
            }, {
            from: summaryData[4].YellowFrom,
            to: summaryData[4].YellowTo,
            color: '#DDDF0D' // yellow
          }, {
            from: summaryData[4].GreenTo,
            to: summaryData[4].GreenFrom,
            color: '#55BF3B' // green
          }]
         
        },

      series: [{
        name: 'Compliance: ',
        data: [summaryData[4].CompliancePercent],
        tooltip: {
          valueSuffix: '%'
        }
      }]

    });

    }
  }
  //DevExpress Chart for TCM01
  comharApp.charts.dxChart = {
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
        size: {
          height: 464
        },
        valueIndicator: {
          offset: 20
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
        value: summaryData[0].CompliancePercent
      });
    }
  }
  return comharApp.charts;
});

