/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const MAX_SPEED = 10;
  const SPEED_INCREMENT = .15;
  const SPEED_RATIO = .1;


  // Game Item Objects
  var ball = GameItem('#ball')
  var changeScore = 0
  var paddle = GameItem('#paddle');
  var storeBricks = [];
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
  creation();
  scoreUpdate();
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
    moveBall();
    handlePaddleCollision();
    allBrickCollisions();
  }
  function moveBall() {
    ball.x += ball.speedX;
    if (ball.x + ball.width >= boardWidth) {
      ball.speedX = ball.speedX * -1;
    }
    if (ball.x < 0) {
      ball.speedX = ball.speedX * -1;
    }
    // update the position of the box along the x-axis
    ball.y += ball.speedY
    if (ball.y + ball.height >= boardHeight) {
      endGame();
    }
    if (ball.y < 0) {
      ball.speedY = ball.speedY * -1;
    }
    $(ball.id).css("left", ball.x)
    $(ball.id).css("top", ball.y)

  }
  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.width
    obj1.bottomY = obj1.y + obj1.height
    // TODO: Do the same for obj2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.width
    obj2.bottomY = obj2.y + obj2.height

    if (obj1.leftX < obj2.rightX && obj1.bottomY > obj2.topY && obj1.rightX > obj2.leftX && obj1.topY < obj2.bottomY) {
      return true
    }
    else {
      return false
    }
    
  }

  function allBrickCollisions() {
    for (var i = 0; i < storeBricks.length; i++) {
      if (doCollide(ball, storeBricks[i])) {
        handleBrickCollisions(storeBricks[i]);
        $(storeBricks[i].id).remove();
        storeBricks.splice(i, 1);
        scoreUpdate();
      }
    }
  }

  
    
  

  function handlePaddleCollision() {
    if (doCollide(paddle, ball)) {
      ball.speedY = ball.speedY * -1;

      var ballMiddle = (ball.x + ball.width / 2);

      var paddleMiddle = (paddle.x + paddle.width / 2);

      ball.speedX += (ballMiddle - paddleMiddle) * SPEED_RATIO;

      ball.speedY += SPEED_INCREMENT;

      ball.speedX = Math.min(ball.speedX, MAX_SPEED);
      ball.speedX = Math.max(ball.speedX, -MAX_SPEED);
      ball.speedY = Math.min(ball.speedY, MAX_SPEED);
      ball.speedY = Math.max(ball.speedY, -MAX_SPEED);

    }
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
  function startball() {
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function creation() {
    var leftFirst = 40;
    var brickX;
    var brickY = 40
    for (var i = 0; i < 9; i++) {
      brickX = leftFirst;
      for (var j = 0; j < 9; j++) {
        var nameTheBrick = "theBricks" + storeBricks.length;
        var brickElement = $('<div>')
          .appendTo($('#board'))
          .addClass("brick")
          .css("left", brickX)
          .css("top", brickY)
          .attr("id", nameTheBrick);

        var brick = GameItem('#' + nameTheBrick);
        storeBricks.push(brick);
        brickX += 40;
      }
      brickY += 20;
    }
  }

  function handleBrickCollisions(boxOfBrick) {
    var ballMiddleX = (ball.x + ball.width / 2);
    var brickMiddleX = (boxOfBrick.x + boxOfBrick.width / 2);
    var ballMiddleY = (ball.y + ball.height / 2);
    var brickMiddleY = (boxOfBrick.y + boxOfBrick.height / 2);

    var ballRelX = ballMiddleX - brickMiddleX;
    var ballRelY = ballMiddleY - brickMiddleY;

    var ballDistancePercentX = ballRelX / boxOfBrick.width;
    var ballDistancePercentY = ballRelY / boxOfBrick.height;

    if (Math.abs(ballDistancePercentX) < Math.abs(ballDistancePercentY)) {
      ball.speedY *= -1;
    }
    else {
      ball.speedX *= -1;
    }
  }


  function scoreUpdate() {
    changeScore += 1
    $("#score").text(changeScore)

  }

}