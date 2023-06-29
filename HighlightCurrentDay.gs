// Define global variables
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet_name = 'Sheet1'; // Replace 'Sheet1' with your sheet name
var sheet = ss.getSheetByName(sheet_name);
// Get the data range
var dataRange = sheet.getDataRange();
var numRows = dataRange.getNumRows();
var numCols = dataRange.getNumColumns();


// Define global variable
var ColorNames = {
  RED: '#ff0000',
  GREEN: '#00ff00',
  BLUE: '#0000ff',
  LIGHT_BLUE: '#ADD8E6',
  YELLOW: '#ffff00',
};

function highlightCurrentDayRow() {
  var dateColumn = 1; // Replace 1 with the column number where your dates are located

  var today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight
  
  var date_range = sheet.getRange(1, dateColumn, sheet.getLastRow(), 1);
  
  var values = date_range.getValues();
  var backgrounds = date_range.getBackgrounds();
  var row_backgrounds = dataRange.getBackgrounds();
  
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    if (cellValue instanceof Date) {
      cellValue.setHours(0, 0, 0, 0);
      if (cellValue.getTime() === today.getTime()) {
        var x = cellValue.getTime();
        backgrounds[i][0] = ColorNames.RED; // Set background color to yellow for the current day
        Logger.log("number of columns: "+numCols)
        for (var j = 0; j < numCols; j++) {
          Logger.log(j);
          row_backgrounds[i][j] = ColorNames.RED; // Change color to desired color
        }
      }
    }
  }
  
  date_range.setBackgrounds(backgrounds);
  dataRange.setBackgrounds(row_backgrounds);
}
