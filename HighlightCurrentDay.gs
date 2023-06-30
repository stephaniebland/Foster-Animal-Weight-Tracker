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
