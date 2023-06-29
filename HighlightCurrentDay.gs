// Define global variables
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet_name = 'Sheet1'; // Replace 'Sheet1' with your sheet name
var sheet = ss.getSheetByName(sheet_name);
// Get the data range
var fullRange = sheet.getDataRange();
var numRows = fullRange.getNumRows();
var numCols = fullRange.getNumColumns();

var dateColumn = 1; // Replace 1 with the column number where your dates are located



// Define global variable
var ColorNames = {
  RED: '#ff0000',
  LIGHT_RED: '#FFCCCC',
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
  var row_backgrounds = fullRange.getBackgrounds();
  
  for (var i = 0; i < values.length; i++) {
    var cellValue = values[i][0];
    if (cellValue instanceof Date) {
      cellValue.setHours(0, 0, 0, 0);
      if (cellValue < today) {
        row_backgrounds[i].fill(ColorNames.LIGHT_BLUE); // Set background color to yellow for the current day
      }
      if (cellValue.getTime() === today.getTime()) {
        row_backgrounds[i].fill(ColorNames.YELLOW); // Set background color to yellow for the current day
      }
      if (cellValue > today) {
        row_backgrounds[i].fill(''); // Set background color to yellow for the current day
      }
    }
  }
  
  date_range.setBackgrounds(backgrounds);
  fullRange.setBackgrounds(row_backgrounds);
}
