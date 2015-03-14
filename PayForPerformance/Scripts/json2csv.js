//set up namespacing. 
define(function() {
  var csvConverter;
  csvConverter = csvConverter || {};

  (function() {
    "use strict";
    return csvConverter = {
      convert: function (array) {
        var array = typeof array !== 'object' ? JSON.parse(array) : array;
        //Assume that the headers of the document are equal to the keys in the JSON object. 
        var headers = Object.keys(array[0]);
        var stringWithHeaders = this.parseHeaders(headers, array);
        var parsedString = this.parseBody(array, stringWithHeaders);
        this.open(parsedString);
      },

      parseHeaders: function(headers) {
        //Push the headers into the CSV string. 
        var str = '';
        headers.forEach(function(item) {
          str += item + ',';
        });
        str += '\r\n';
        return str;
      },

      parseBody: function(array, str) {
        var regex, value, line;

        array.forEach(function (item, index) {
          line = '';
          for ( index in item ) {
            if (  line !== '' ) line += ','; 
            regex = /\,/;
            value = item[index];

            if (typeof value  === "string") {
              // If the value contained in the JSON object is a string:
              // Perform a regex test to check and see if the value has a comma already in place and escape the value. 
              // e.g. "Smith, Jones" as a value should not be separated two different columns. 
              value = regex.test(value) ? '"' + value + '"' : value;
            }
            line += value;
          }
          str += line + '\r\n';
        });
        return str;
      },

      open: function(csvString) {
        if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) 
        {  // Determine if client is IE11
          var blob = new Blob([csvString], {
            type: "text/csv;charset=utf-8;"
          });
          return window.navigator.msSaveBlob(blob, "tcm-01.csv");
        } 
        else {
          var blob = new Blob([csvString], {
            type: "text/csv;charset=utf-8;"
          });
          var filename = 'tcm01.csv';
          var link = document.createElement("a");
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);

          link.style = "visibility:hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      
      }
    }
  }.call(this));

  return csvConverter;
});