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
var pastIndex = dateIndices[0];
var todaysIndex = dateIndices[1];
var futureIndex = dateIndices[2];
Logger.log(typeof pastIndex[0]);
Logger.log("new valid_index: "+typeof todaysIndex[0]);
Logger.log(typeof futureIndex[0]);
var allDateIndices = [].concat(...dateIndices);
// var allDateIndices = Number(allDateIndices)
Logger.log(typeof allDateIndices[0]);





function highlightCurrentDayRow(allDateIndices) {  
  var row_backgrounds = fullRange.getBackgrounds();

  for (row of allDateIndices) {
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

var firstAnimalColumn = 1; // Replace 1 with the column number where your dates are located
var numAnimals = 3;

// function highlightWeightLoss(allDateIndices) {  
//   var values = fullRange.getValues();
//   var backgrounds = fullRange.getBackgrounds();

//   for (row of allDateIndices) {
//     Logger.log("index is: "+typeof row);
//     for (col = firstAnimalColumn; column < firstAnimalColumn + numAnimals; column++) {
//       Logger.log(col)

//       if (row < todaysIndex) {
//         backgrounds[row].fill(ColorNames.LIGHT_BLUE); // Set background color to yellow for the current day
//       }
//       else if (row == todaysIndex) {
//         backgrounds[row].fill(ColorNames.YELLOW); // Set background color to yellow for the current day
//       }
//       else if (row > todaysIndex) {
//         backgrounds[row].fill(''); // Set background color to yellow for the current day
//       }
//     }
//   }
  
//   fullRange.setBackgrounds(backgrounds);
// }

// highlightWeightLoss(allDateIndices)


function highlightWeightLoss(allDateIndices, todaysIndex) {
  var first_date = Math.min(...allDateIndices) + 1;
  var current_date = Math.max(...todaysIndex) + 1;
  var num_rows = current_date + 1 - first_date;


  var animalRange = sheet.getRange(first_date, firstAnimalColumn, num_rows, numAnimals); 
  var values = animalRange.getValues();
  Logger.log(values)
  var backgrounds = animalRange.getBackgrounds();

  // for (column = firstAnimalColumn; column < firstAnimalColumn + numAnimals; column++) {
  //   for (var i = 1; i < values.length; i++) {
  //     var currentValue = values[i][column];
  //     var previousValue = values[i - 1][column];
  //     if (!Number.isInteger(currentValue)) {
  //       backgrounds[i][column] = ColorNames.BLACK; // Set background color to light red
  //     }
  //     else if (currentValue < previousValue*.9) {
  //       Logger.log(Number.isInteger(currentValue));
  //       backgrounds[i][column] = ColorNames.RED; // Set background color to light red
  //     }
  //   }
  // }

  animalRange.setBackgrounds(backgrounds);

}
highlightWeightLoss(allDateIndices, todaysIndex)
