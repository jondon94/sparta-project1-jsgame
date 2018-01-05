(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

var ctx = $('#surface')[0].getContext("2d"),
  width = 1000,
  height = 600,
  player = {
    x: 20,
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
  backGroundAudio = new Audio('../Music/Fuji_Looping.mp3'),
  keys = [],
  friction = 0.8,
  gravity = 0.3;
  sec = 60;
  score = 0;

var boxes = [];
var sawboxes = [];
var fireboxes = [];
var doorUp = [];

playChar.src = "../images/sprite.png"
brickTile.src = "../images/bricks.jpg"
sawTile.src = "../images/Circular_saw_blade.png"
doorTile.src = "../images/Door.png"
fireTile.src = "../images/fire.png"

surface.width = width;
surface.height = height;
//////////////inputs
function update(){
  // check keys
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
            player.speed = 0;
            window.open("deadindex.html", "_self");
            player.x = 0;


        } else if (dir === "b") {
            player.speed = 0;
            window.open("deadindex.html", "_self");
            player.x = 0;

        } else if (dir === "t") {
            player.velY *= -1;
            player.speed = 0;
            window.open("deadindex.html", "_self");
            player.x = 0;
        }
    }
    if(player.grounded){
         player.velY = 0;
    }

  //////////killboxes below
  player.grounded = false;
  for (var i = 0; i < sawboxes.length; i++) {
      ctx.rect(sawboxes[i].x, sawboxes[i].y, sawboxes[i].width, sawboxes[i].height);

      var dir = colCheck(player, sawboxes[i]);

      if (dir === "l" || dir === "r") {
          player.velX = 0;
          player.speed = 0;
          window.open("deadindex.html", "_self");
          player.x = 0;


      } else if (dir === "b") {
          player.speed = 0;
          window.open("deadindex.html", "_self");
          player.x = 0;

      } else if (dir === "t") {
          player.velY *= -1;
          player.speed = 0;
          window.open("deadindex.html", "_self");
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
            player.x = 0;
            window.open("surface.html", "_self");
            return;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            player.x = 0;
            window.open("surface.html", "_self");
            return;
        } else if (dir === "t") {
            player.velY *= -1;
            player.x = 0;
            window.open("surface.html", "_self");
            return;
        }
      }
      if(player.grounded){
           player.velY = 0;
      }

  ctx.clearRect(player.x, player.y, player.width, player.height);
  ctx.drawImage(playChar, player.x-10, player.y-70, 100, 100);

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
