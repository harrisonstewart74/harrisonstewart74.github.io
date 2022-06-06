/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    "left": 37,
    "right": 39,
    "up" : 38,
    "down": 40
  }

  var positionX = 0;
   
  
  var positionY = 0;
    
  
  var speedX = 0;
    
  
  var speedY = 0;
    
  
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeydown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyup);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   repositionGameItem();
   redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeydown(event) {
    if (event.which === KEY.left) {
    speedX = -5;
      console.log("left pressed");
    }
    else if  (event.which === KEY.right) {
      console.log("right pressed")
    speedX = 5;
    }
    else if  (event.which === KEY.up) {
      console.log("up pressed")
    speedY = -5;
    }
    else if  (event.which === KEY.down) {
      console.log("down pressed")
    speedY = 5;
    }
  }

  function handleKeyup(event) {
    if (event.which === KEY.left) {
      speedX = 0;
        console.log("left released");
      }
      else if  (event.which === KEY.right) {
        console.log("right released")
      speedX = 0;
      }
      else if  (event.which === KEY.up) {
        console.log("up released")
      speedY = 0;
      }
      else if  (event.which === KEY.down) {
        console.log("down released")
      speedY = 0;
      }

    }

  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }
  function redrawGameItem(){
    $("#walker").css("left", positionX);
    $("#walker").css("top", positionY);
}

}
