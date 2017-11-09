(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

var ctx = $('#canvas')[0].getContext("2d"),
  width = 1000,
  height = 600,
  player = {
    x: 20,
    y: 570,
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

//Boxes+Platforms+Environments(Shapes go here)
var boxes = [];
////bottom row
boxes.push({
  x: 0,
  y: 570,
  width: 50,
  height: 30,
});
boxes.push({
  x: 150,
  y: 570,
  width: 50,
  height: 30,
});
boxes.push({
  x: 300,
  y: 570,
  width: 50,
  height: 30,
});
boxes.push({
  x: 450,
  y: 570,
  width: 50,
  height: 30,
});
boxes.push({
  x: 600,
  y: 570,
  width: 50,
  height: 30,
});
boxes.push({
  x: 750,
  y: 570,
  width: 50,
  height: 30,
});
boxes.push({
  x: 900,
  y: 570,
  width: 50,
  height: 30,
});
////rhs
boxes.push({
  x: 970,
  y: 0,
  width: 30,
  height: 600,
});
boxes.push({
  x: 875,
  y: 150,
  width: 40,
  height: 300,
});
////top row
boxes.push({
  x: 0,
  y: 150,
  width: 220,
  height: 75,
});
boxes.push({
  x: 270,
  y: 160,
  width: 70,
  height: 35,
});
boxes.push({
  x: 400,
  y: 190,
  width: 80,
  height: 75
});
boxes.push({
  x: 540,
  y: 190,
  width: 80,
  height: 75
});
boxes.push({
  x: 660,
  y: 150,
  width: 220,
  height: 75,
});
////fire
var fireboxes = [];
////bottom row
fireboxes.push({
  x: 50,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 70,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 90,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 110,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 130,
  y: 575,
  width: 15,
  height: 25,
});
////bottom row 2
fireboxes.push({
  x: 200,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 220,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 240,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 260,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 280,
  y: 575,
  width: 15,
  height: 25,
});
////bottom row 3
fireboxes.push({
  x: 350,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 370,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 390,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 410,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 430,
  y: 575,
  width: 15,
  height: 25,
});
////bottom row 4
fireboxes.push({
  x: 500,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 520,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 540,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 560,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 580,
  y: 575,
  width: 15,
  height: 25,
});
////bottom row 5
fireboxes.push({
  x: 650,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 670,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 690,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 710,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 730,
  y: 575,
  width: 15,
  height: 25,
});
////bottom row 6
fireboxes.push({
  x: 800,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 820,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 840,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 860,
  y: 575,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 880,
  y: 575,
  width: 15,
  height: 25,
});
////bottom row lhs
fireboxes.push({
  x: 950,
  y: 575,
  width: 15,
  height: 25,
});

////sawblades
var sawboxes = [];
////rhs
sawboxes.push({
  x: 955,
  y: 285,
  width: 50,
  height: 50,
});
sawboxes.push({
  x: 885,
  y: 185,
  width: 50,
  height: 50,
});
sawboxes.push({
  x: 885,
  y: 385,
  width: 50,
  height: 50,
});

////door to next level
var doorUp = [];
doorUp.push({
  x: 30,
  y: 120,
  width: 20,
  height: 30,
});


//////////////timer
(function(){
  var timer = window.setInterval(function() {
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      $("#canvas").hide();
      return;
    }
    $('#timer_div').html(sec);
}, 1000/2)
})();

canvas.width = width;
canvas.height = height;
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

  //////////killboxes below
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
            window.open("indexlevel5.html", "_self");
            return;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            alert("Well Done")
            player.x = 0;
            window.open("indexlevel5.html", "_self");
            return;
        } else if (dir === "t") {
            player.velY *= -1;
            alert("Well Done")
            player.x = 0;
            window.open("indexlevel5.html", "_self");
            return;
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
