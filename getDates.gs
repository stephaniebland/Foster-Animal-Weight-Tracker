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


// var dateIndices = findValidDateRows();
// var firstDate = dateIndices[0];
// var todaysDate = dateIndices[1];
// var lastDate = dateIndices[2];


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

// highlightCurrentDayRow(firstDate, todaysDate, lastDate);

var firstAnimalColumn = 1; // Replace 1 with the column number where your dates are located
var numAnimals = 3;


function highlightWeightLoss(firstDate, todaysDate) {
  var numRows = todaysDate + 1 - firstDate;
  Logger.log("("+(firstDate + 1)+","+(firstAnimalColumn + 1)+","+(numRows)+","+(numAnimals)+")");
  var animalRange = sheet.getRange(3, 2, 20, 3);

  var animalRange = sheet.getRange(firstDate + 1, firstAnimalColumn + 1, numRows, numAnimals);
  var values = animalRange.getValues();
  Logger.log(values);

  var backgrounds = animalRange.getBackgrounds();

  for (var col = 0; col < numAnimals; col++) {
    previousValue = previous2Value = 0;
    for (var row = 0; row < numRows; row++) {
      Logger.log("("+row+","+col+")");
      empty = risky = urgent = false;
      currentValue = values[row][col];
      Logger.log("("+row+","+col+") = "+values[row][col]);

      if (!Number.isInteger(currentValue)) {
        empty = true;
      }
      else if (currentValue < previousValue*.9){
        urgent = true;
      }
      else if ((currentValue < previousValue*0.99) && (previousValue < previous2Value*0.99)){
        risky = true;
      }
      if (row==numRows-1){
        Logger.log("last row ("+row+","+col+") = "+values[row][col]);
        if (urgent) {
          backgrounds[row][col] = 'red';
        } else if (risky){
          backgrounds[row][col] = 'orange';
        } else if (empty){
          backgrounds[row][col] = 'yellow';
        }
      } else {
        if (urgent) {
          backgrounds[row][col] = '#ff9595';
        } else if (risky){
          backgrounds[row][col] = '#f7c385';
        } else if (empty){
          backgrounds[row][col] = 'blue';
        }
      }
      previous2Value = previousValue;
      previousValue = currentValue;
    }
  }
  animalRange.setBackgrounds(backgrounds);
}

// highlightWeightLoss(firstDate, todaysDate);


/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 */
function onEdit(e) {
  var dateIndices = findValidDateRows();
  var firstDate = dateIndices[0];
  var todaysDate = dateIndices[1];
  var lastDate = dateIndices[2];
  highlightCurrentDayRow(firstDate, todaysDate, lastDate);
  highlightWeightLoss(firstDate, todaysDate);


}
