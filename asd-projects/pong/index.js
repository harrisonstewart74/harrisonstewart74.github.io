/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var ball = GameItem('#ball')
  var paddle = GameItem('#paddle');

  var KEY = {
    "left": 37,
    "right": 39,
    "up": 38,
    "down": 40
  }

  function GameItem(elementId) {
    var gameItem = {};
    gameItem.id = elementId;
    gameItem.y = parseFloat($(elementId).css('top'));
    gameItem.x = parseFloat($(elementId).css('left'));
    gameItem.width = $(elementId).width();
    gameItem.height = $(elementId).height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    return gameItem;
  }
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startball();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  var board = jQuery('#board');
  var boardWidth = board.width();
  var boardHeight = board.height();

  function newFrame() {
    movePaddle();


  }
  function moveBall(){
    ball.x += ball.speedX;              // update the position of the box along the x-axis
    if (ball.x + ball.width >= boardWidth) {
      ball.x = ball.speedX * -1;
    }
    if (ball.x < 0) {
      ball.x = ball.speedX * -1;
    }
    ball.x += ball.speedX;              // update the position of the box along the x-axis
    if (ball.y + ball.height >= boardHeight) {
      ball.y = ball.speedY * -1;
    }
    if (ball.y < 0) {
      ball.y -= ball.speedY * -1;
    }
    $(ball.id).css("left", ball.x)
    $(ball.id).css("top", ball.y)

  }

  /* 
  Called in response to events.
  */
  function movePaddle() {
    paddle.x += paddle.speedX;              // update the position of the box along the x-axis
    if (paddle.x + paddle.width >= boardWidth) {
      paddle.x -= paddle.speedX;
    }
    if (paddle.x < 0) {
      paddle.x -= paddle.speedX;
    }
    $(paddle.id).css("left", paddle.x)
  }

  function handleKeyDown(event) {
    if (event.which === KEY.left) {
      console.log("left pressed");
      paddle.speedX = -5
    }
    if (event.which === KEY.right) {
      console.log("right pressed")
      paddle.speedX = 5
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.left) {
      console.log("left released");
      paddle.speedX = 0
    }
    else if (event.which === KEY.right) {
      console.log("right released")
      paddle.speedX = 0
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function startball(){
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.x = 0
    ball.y = 0
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
