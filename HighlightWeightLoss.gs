// Define global variables
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet_name = 'Sheet1'; // Replace 'Sheet1' with your sheet name
var sheet = ss.getSheetByName(sheet_name);
// Get the data range
var fullRange = sheet.getDataRange();
var numRows = fullRange.getNumRows();
var numCols = fullRange.getNumColumns();

var dateColumn = 1; // Replace 1 with the column number where your dates are located
var firstAnimalColumn = 2; // Replace 1 with the column number where your dates are located
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

var column = 2; // Replace 1 with the column number to compare


function highlightWeightLoss() {
  var range = sheet.getDataRange();
  var values = range.getValues();
  var backgrounds = range.getBackgrounds();

  for (column = firstAnimalColumn; column < firstAnimalColumn + numAnimals; column++) {
      for (var i = 1; i < values.length; i++) {
      var currentValue = values[i][column - 1];
      var previousValue = values[i - 1][column - 1];
      if (!Number.isInteger(currentValue)) {
        backgrounds[i][column - 1] = ColorNames.BLACK; // Set background color to light red
      }
      else if (currentValue < previousValue*.9) {
        Logger.log(Number.isInteger(currentValue));
        backgrounds[i][column - 1] = ColorNames.RED; // Set background color to light red
      }
    }
  }

  range.setBackgrounds(backgrounds);

}
