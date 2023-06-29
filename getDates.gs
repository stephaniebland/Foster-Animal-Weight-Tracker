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
};

function findValidDateRows() {
  var date_range = sheet.getRange(1, dateColumn, sheet.getLastRow(), 1);
  var all_dates = date_range.getValues();

  var pastIndex = [];
  var todaysIndex = [];
  var futureIndex = [];

  var today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  for (var i = 0; i < all_dates.length; i++) {
    var timestamp = all_dates[i][dateColumn - 1];
    if (timestamp instanceof Date && !isNaN(timestamp.getTime())) {
      timestamp.setHours(0, 0, 0, 0);

      if (timestamp < today) {
        pastIndex.push(i)
      }
      else if (timestamp.getTime() === today.getTime()) {
        todaysIndex.push(i)
      }
      else if (today < timestamp) {
        futureIndex.push(i)
      }
    }
  }
  return [pastIndex, todaysIndex, futureIndex]
}


var dateIndices = findValidDateRows();
pastIndex = dateIndices[0];
todaysIndex = dateIndices[1];
futureIndex = dateIndices[2];
Logger.log(pastIndex);
Logger.log("new valid_index: "+todaysIndex);
Logger.log(futureIndex);
var allDateIndices = [].concat(...dateIndices);





function highlightCurrentDayRow(allDateIndices) {  
  var row_backgrounds = fullRange.getBackgrounds();

  for (row of allDateIndices) {
    Logger.log("index is: "+typeof row);
    // row_backgrounds[row][1] = 'lightblue';

    if (row < todaysIndex) {
      row_backgrounds[row].fill(ColorNames.LIGHT_BLUE); // Set background color to yellow for the current day
    }
    else if (row == todaysIndex) {
      row_backgrounds[row].fill(ColorNames.YELLOW); // Set background color to yellow for the current day
    }
    else if (row > todaysIndex) {
      row_backgrounds[row].fill(''); // Set background color to yellow for the current day
    }

  }
  
  fullRange.setBackgrounds(row_backgrounds);
}

highlightCurrentDayRow(allDateIndices)
