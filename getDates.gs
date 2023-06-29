var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet_name = 'Sheet1'; // Replace 'Sheet1' with your sheet name
var sheet = ss.getSheetByName(sheet_name); // Replace 'Sheet1' with your sheet name
var dateColumn = 1; // Replace 1 with the column number where your dates are located

var fullRange = sheet.getDataRange();
var numRows = fullRange.getNumRows();
var numCols = fullRange.getNumColumns();

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

function findValidDateRows() {
  var date_range = sheet.getRange(1, dateColumn, sheet.getLastRow(), 1);
  var all_dates = date_range.getValues();

  var today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  var firstDate = -1;
  for (var i = 0; i < all_dates.length; i++) {
    var timestamp = all_dates[i][dateColumn - 1];
    if (timestamp instanceof Date && !isNaN(timestamp.getTime())) {
      timestamp.setHours(0, 0, 0, 0);

      if (firstDate == -1){
        firstDate = i;
      }
      if (timestamp.getTime() === today.getTime()) {
        todaysDate = i;
      }
      var lastDate = i;
    }
  }
  return [firstDate, todaysDate, lastDate];
}


num: dateIndices = findValidDateRows();
num: firstDate = dateIndices[0];
num: todaysDate = dateIndices[1];
var lastDate = dateIndices[2];


function highlightCurrentDayRow(firstDate, todaysDate, lastDate) {  
  var row_backgrounds = fullRange.getBackgrounds();

  for (row=firstDate; row<lastDate; row++) {

    if (row < todaysDate) {
      row_backgrounds[row].fill(ColorNames.LIGHT_BLUE); // Set background color to yellow for the current day
    }
    else if (row == todaysDate) {
      row_backgrounds[row].fill(ColorNames.YELLOW); // Set background color to yellow for the current day
    }
    else if (row > todaysDate) {
      row_backgrounds[row].fill(''); // Set background color to yellow for the current day
    }

  }
  fullRange.setBackgrounds(row_backgrounds);
}

highlightCurrentDayRow(firstDate, todaysDate, lastDate);

var firstAnimalColumn = 1; // Replace 1 with the column number where your dates are located
var numAnimals = 3;


function highlightWeightLoss(firstDate, todaysDate) {
  var num_rows = todaysDate + 1 - firstDate;

  var animalRange = sheet.getRange(firstDate + 1, firstAnimalColumn + 1, num_rows, numAnimals + 1); 
  var values = animalRange.getValues();

  var backgrounds = animalRange.getBackgrounds();

  for (var col = 0; col < numAnimals; col++) {
    previousValue = previous2Value = 0;
    for (var row = 0; row < num_rows-1; row++) {
      currentValue = values[row][col];

      if (!Number.isInteger(currentValue)) {
        backgrounds[row][col] = 'blue';
      }
      else if (currentValue < previousValue*.9){
        backgrounds[row][col] = 'red';
      }
      else if ((currentValue < previousValue*0.99) && (previousValue < previous2Value*0.99)){
        backgrounds[row][col] = 'orange';
      }
      previous2Value = previousValue;
      previousValue = currentValue;
    }
  }
  animalRange.setBackgrounds(backgrounds);
}
highlightWeightLoss(firstDate, todaysDate);
