var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet_name = 'Sheet1'; // Replace 'Sheet1' with your sheet name
var sheet = ss.getSheetByName(sheet_name); // Replace 'Sheet1' with your sheet name
var dateColumn = 1; // Replace 1 with the column number where your dates are located

var fullRange = sheet.getDataRange();
var numRows = fullRange.getNumRows();
var numCols = fullRange.getNumColumns();

var firstAnimalColumn = 1; // Replace 1 with the column number where your dates are located
var numAnimals = 3;

// Define global variable
var ColorNames = {
  RED: '#ff0000',
  LIGHT_RED: '#FFCCCC',
  GREEN: '#00ff00',
  BLUE: '#0000ff',
  LIGHT_BLUE: '#ADD8E6',
  YELLOW: '#ffff00',
  BLACK: '#000000',
};

function main() {
  // Define the rows of the spreadsheet that contain valid dates
  var dateIndices = findValidDateRows();
  var firstDate = dateIndices[0]; // First row of spreadsheet containing a valid date
  var todaysDate = dateIndices[1]; // Last row in spreadsheet containing today's date
  var lastDate = dateIndices[2]; // Last row of valid dates in spreadsheet

  highlightCurrentDayRow(firstDate, todaysDate, lastDate); // highlight all rows from prior dates light blue
  highlightWeightLoss(firstDate, todaysDate); // highlight row from today's date yellow
}

/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 */
function onEdit(e) {
  main()
}

/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen(e) {
  main()
}


