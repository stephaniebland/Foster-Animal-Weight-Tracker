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
