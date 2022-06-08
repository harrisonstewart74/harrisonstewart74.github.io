// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////
function applyFilter() {
  for (var r = 0; r < image.length; r++) {
    var row = image[r];
    for (var c = 0; c < row.length; c++)
      var rgbstring = row[c];
  }
}
// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);

}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
applyFilterNoBackground(decreaseBlue);
applyFilterNoBackground(increaseGreenByBlue);
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var r = 0; r < image.length; r++) {
    var row = image[r];
    for (var c = 0; c < row.length; c++) {
      var rgbString = row[c];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      row[c] = rgbString;
    }
  }
}
// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  for (var r = 0; r < image.length; r++) {
    var row = image[r];
    for (var c = 0; c < row.length; c++) {
      var rgbString = row[c];
      if (rgbString === image[0][0]){
        continue;
      }
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      row[c] = rgbString;
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(myNumber) {
  var temporary = Math.min(myNumber, 255)
  return Math.max(temporary, 0)
}
// TODO 3: Create reddify function
function reddify(thisParameter) {
  thisParameter[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(myArray) {
  myArray[BLUE] = keepInBounds(myArray[BLUE] - 50);
}

function increaseGreenByBlue(thisArray) {
  thisArray[GREEN] = keepInBounds(thisArray[BLUE] + thisArray[GREEN]);
}
// CHALLENGE code goes below here
