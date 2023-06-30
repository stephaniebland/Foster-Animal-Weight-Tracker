function highlightWeightLoss(firstDate, todaysDate) {
  var numRows = todaysDate + 1 - firstDate;

  var animalRange = sheet.getRange(firstDate + 1, firstAnimalColumn + 1, numRows, numAnimals);
  var values = animalRange.getValues();
  var backgrounds = animalRange.getBackgrounds();

  for (var col = 0; col < numAnimals; col++) {
    previousValue = previous2Value = 0;
    for (var row = 0; row < numRows; row++) {
      empty = risky = urgent = false;
      currentValue = values[row][col];

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
