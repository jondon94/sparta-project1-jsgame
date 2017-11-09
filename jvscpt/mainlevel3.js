(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

var ctx = $('#canvas')[0].getContext("2d"),
    width = 1000,
    height = 600,
    player = {
      x: 120,
      y: height-5,
      speed: 3,
      velX: 0,
      velY: 0,
      width: 10,
      height: 18,
      jumping: false,
    },
    playChar = new Image(),
    brickTile = new Image(),
    sawTile = new Image(),
    doorTile = new Image(),
    fireTile = new Image(),
    backGroundAudio = new Audio('../Music/Zombie_Game_Looping.mp3'),
    brickPat = ctx.createPattern(brickTile, "repeat")
    keys = [],
    friction = 0.8,
    gravity = 0.3;
    sec = 60;
    score = 0;

playChar.src = "../images/robotSprite.png"
brickTile.src = "../images/bricks.jpg"
sawTile.src = "../images/Circular_saw_blade.png"
doorTile.src = "../images/Door.png"
fireTile.src = "../images/fire.png"

//Boxes+Platforms(Shapes go here)
var boxes = [];
///left colum + starting zone
boxes.push({
  x: 00,
  y: 590,
  width: 200,
  height: 50,
});
boxes.push({
  x: 00,
  y: 300,
  width: 50,
  height: 300,
});
boxes.push({
  x: 00,
  y: 00,
  width: 50,
  height: 300,
});
///door platform
boxes.push({
  x: 880,
  y: 520,
  width: 50,
  height: 25,
});
///bridge
boxes.push({
  x: 100,
  y: 200,
  width: 220,
  height: 20,
});
boxes.push({
  x: 390,
  y: 200,
  width: 220,
  height: 20,
});
boxes.push({
  x: 670,
  y: 200,
  width: 200,
  height: 20,
});

var fireboxes = [];
//firezones go here
fireboxes.push({
  x: 205,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 225,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 245,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 265,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 285,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 305,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 325,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 345,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 365,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 385,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 405,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 425,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 445,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 465,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 485,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 505,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 525,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 545,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 565,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 585,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 605,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 625,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 645,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 665,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 685,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 705,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 725,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 745,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 765,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 785,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 805,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 825,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 845,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 865,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 885,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 905,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 925,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 945,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 965,
  y: 585,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 985,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 1005,
  y: 575,
  width: 15,
  height: 15,
});

var sawboxes = [];
//sawboxes are here
sawboxes.push({
  x: 330,
  y: 180,
  width: 50,
  height: 50,
});
sawboxes.push({
  x: 615,
  y: 180,
  width: 50,
  height: 50,
});

var doorUp = [];
//doorUp
doorUp.push({
  x: 890,
  y: 500,
  width:12,
  height: 20,
});
//////////////timer
(function(){
  var sec = 60;
  var id = window.setInterval(function() {
    sec--;
    if (sec < 0) {
      clearInterval(id);
      $("#canvas").hide();
      return;
    }
    $('#timer_div').html(sec)
  }, 1000)
})();

canvas.width = width;
canvas.height = height;
//////////////inputs
function update(){

  if (keys[38]) {
      // up arrow
    if(!player.jumping){
     player.jumping = true;
     player.velY = -player.speed*2;
    }
  }

  if (keys[39]) {
    // right arrow
    if (player.velX < player.speed && player.x < 980) {
        player.velX++;
      }
  }

  if (keys[37]) {
    // left arrow
    if (player.velX > -player.speed && player.x > 10) {
        player.velX--;
    }
  }

  if (keys[40]){
      //down arrow = duck
    if (player.height = 18)
       player.width = 10,
       player.height = 10;
  } else if (player.height = 10) {
      player.height = 18;
  }

  player.velX *= friction;
  player.velY += gravity;

  player.x += player.velX;
  player.y += player.velY;


  if(player.y >= height-player.height){
    player.y = height - player.height;
    player.jumping = false;
  }

  //These are object in world
  ctx.clearRect(0,0,width,height);
  ctx.beginPath();
  for (var i = 0; i < boxes.length; i++) {
    ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    ctx.drawImage(brickTile, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
  }

  ctx.beginPath();
  for (var i = 0; i < fireboxes.length; i++) {
    ctx.rect(fireboxes[i].x, fireboxes[i].y, fireboxes[i].width, fireboxes[i].height);
    ctx.drawImage(fireTile, fireboxes[i].x, fireboxes[i].y, fireboxes[i].width, fireboxes[i].height)
  }

  ctx.beginPath();
  for (var i = 0; i < sawboxes.length; i++) {
    ctx.rect(sawboxes[i].x, sawboxes[i].y, sawboxes[i].width, sawboxes[i].height);
    ctx.drawImage(sawTile, sawboxes[i].x, sawboxes[i].y, sawboxes[i].width+5, sawboxes[i].height+5)
  }

  ctx.beginPath();
  for (var i = 0; i < doorUp.length; i++) {
    ctx.rect(doorUp[i].x, doorUp[i].y, doorUp[i].width, doorUp[i].height);
    ctx.drawImage(doorTile, doorUp[i].x, doorUp[i].y-5, doorUp[i].width+5, doorUp[i].height+5)
  }

///////////platforms below
  player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
      ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);

      var dir = colCheck(player, boxes[i]);

      if (dir === "l" || dir === "r") {
        player.velX = 0;
        player.jumping = false;
      } else if (dir === "b") {
        player.grounded = true;
        player.jumping = false;
      } else if (dir === "t") {
        player.velY *= -1;
      }
    }
    if(player.grounded){
         player.velY = 0;
    }
  //////////killboxes below
  player.grounded = false;
    for (var i = 0; i < fireboxes.length; i++) {
      ctx.rect(fireboxes[i].x, fireboxes[i].y, fireboxes[i].width, fireboxes[i].height);

      var dir = colCheck(player, fireboxes[i]);

      if (dir === "l" || dir === "r") {
          player.velX = 0;
          alert("You died")
          $("#canvas").hide();
          player.speed = 0;
          player.x = 0;

      } else if (dir === "b") {
          player.speed = 0;
          alert("You died")
          $("#canvas").hide();
          player.x = 0;

      } else if (dir === "t") {
          player.velY *= -1;
          player.speed = 0
          alert("You died")
          $("#canvas").hide();
          player.x = 0;
      }
  }
  if(player.grounded){
       player.velY = 0;
  }
  player.grounded = false;
  for (var i = 0; i < sawboxes.length; i++) {
    ctx.rect(sawboxes[i].x, sawboxes[i].y, sawboxes[i].width, sawboxes[i].height);

    var dir = colCheck(player, sawboxes[i]);

    if (dir === "l" || dir === "r") {
      player.velX = 0;
      player.speed = 0;
      alert("You died")
      $("#canvas").remove();
      var score = 1;
      $('#timer_div').remove();
      player.x = 0;


    } else if (dir === "b") {
      player.speed = 0;
      alert("You died")
      $("#canvas").remove();
      var score = 1;
      $('#timer_div').remove();
      player.x = 0;

    } else if (dir === "t") {
      player.velY *= -1;
      player.speed = 0;
      alert("You died")
      $("#canvas").remove();
      var score = 1;
      $('#timer_div').remove();
      player.x = 0;
    }
  }
  if(player.grounded){
       player.velY = 0;
  }

  /////////////////Next level Door
  player.grounded = false;
    for (var i = 0; i < doorUp.length; i++) {
      ctx.rect(doorUp[i].x, doorUp[i].y, doorUp[i].width, doorUp[i].height);

      var dir = colCheck(player, doorUp[i]);

      if (dir === "l" || dir === "r") {
        player.velX = 0;
        player.jumping = false;
        alert("Well Done")
        player.x = 0;
        window.open("indexlevel4.html", "_self");
      }
      else if (dir === "b") {
        player.grounded = true;
        player.jumping = false;
        alert("Well Done")
        player.x = 0;
        window.open("indexlevel4.html", "_self");
      }
      else if (dir === "t") {
        player.velY *= -1;
        alert("Well Done")
        player.x = 0;
        window.open("indexlevel4.html", "_self");
      }
    }
    if(player.grounded){
         player.velY = 0;
    }

  ctx.clearRect(player.x, player.y, player.width, player.height);
  ctx.drawImage(playChar, player.x-10, player.y-15, 35, 35);

  requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
  // get the vectors to check against
  var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
    // add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2),
    hHeights = (shapeA.height / 2) + (shapeB.height / 2),
    colDir = null;

  // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    var oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
    if (oX >= oY) {
      if (vY > 0) {
        colDir = "t";
        shapeA.y += oY;
      } else {
        colDir = "b";
        shapeA.y -= oY;
      }
    } else {
        if (vX > 0) {
          colDir = "l";
          shapeA.x += oX;
        } else {
          colDir = "r";
          shapeA.x -= oX;
        }
    }
  }
  return colDir;
}

backGroundAudio.play();
backGroundAudio.loop = true;

$(this).on("keydown", function(e){
  keys[e.keyCode] = true;
});

$(this).on("keyup", function(e){
  keys[e.keyCode] = false;
})

$(this).on("load", function(){
  update();
})

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
