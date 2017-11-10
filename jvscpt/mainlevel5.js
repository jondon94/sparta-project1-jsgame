(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

var ctx = $('#canvas')[0].getContext("2d"),
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
  backGroundAudio = new Audio('../Music/Zombie_Game_Looping.mp3'),
  keys = [],
  friction = 0.8,
  gravity = 0.3;
  sec = 60;
  score = 0;

playChar.src = "../images/sprite.png"
brickTile.src = "../images/bricks.jpg"
sawTile.src = "../images/Circular_saw_blade.png"
doorTile.src = "../images/Door.png"
fireTile.src = "../images/fire.png"

//Boxes+Platforms+Environments(Shapes go here)
var boxes = [];
////bottom row
boxes.push({
  x: 0,
  y: 580,
  width: 40,
  height: 30,
});
boxes.push({
  x: 90,
  y: 490,
  width: 30,
  height: 40,
});
boxes.push({
  x: 240,
  y: 490,
  width: 30,
  height: 40,
});
boxes.push({
  x: 330,
  y: 440,
  width: 30,
  height: 40,
});
boxes.push({
  x: 440,
  y: 560,
  width: 30,
  height: 40,
});
boxes.push({
  x: 540,
  y: 470,
  width: 30,
  height: 40,
});
boxes.push({
  x: 640,
  y: 400,
  width: 30,
  height: 40,
});
boxes.push({
  x: 760,
  y: 520,
  width: 120,
  height: 20,
});
////rhs
boxes.push({
  x: 840,
  y: 200,
  width: 30,
  height: 280,
});
boxes.push({
  x: 960,
  y: 100,
  width: 40,
  height: 500,
});
////top row
boxes.push({
  x: 0,
  y: 200,
  width: 200,
  height: 50,
});
boxes.push({
  x: 300,
  y: 200,
  width: 200,
  height: 50,
});
boxes.push({
  x: 600,
  y: 200,
  width: 270,
  height: 50,
});
boxes.push({
  x: 80,
  y: 65,
  width: 15,
  height: 100,
})
boxes.push({
  x: 30,
  y: 100,
  width: 15,
  height: 100,
})

var fireboxes = [];
//fireboxes go here
////bottom row
fireboxes.push({
  x: 170,
  y: 490,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 300,
  y: 450,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 370,
  y: 450,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 600,
  y: 480,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 690,
  y: 480,
  width: 15,
  height: 25,
});
////rhs
fireboxes.push({
  x: 900,
  y: 520,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 900,
  y: 430,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 900,
  y: 340,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 900,
  y: 250,
  width: 15,
  height: 25,
});
////top row
fireboxes.push({
  x: 540,
  y: 90,
  width: 15,
  height: 25,
});
fireboxes.push({
  x: 240,
  y: 90,
  width: 15,
  height: 25,
});

var sawboxes = [];
////Bottom row
sawboxes.push({
  x: 50,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 100,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 150,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 200,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 250,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 300,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 350,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 400,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 450,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 500,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 550,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 600,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 650,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 700,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 750,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 800,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 850,
  y: 565,
  width: 50,
  height: 50,
})
sawboxes.push({
  x: 900,
  y: 565,
  width: 50,
  height: 50,
})
////top row
sawboxes.push({
  x: 880,
  y: 100,
  width: 70,
  height: 70,
})
sawboxes.push({
  x: 520,
  y: 190,
  width: 70,
  height: 70,
})
sawboxes.push({
  x: 220,
  y: 190,
  width: 70,
  height: 70,
})
sawboxes.push({
  x: 900,
  y: 565,
  width: 50,
  height: 50,
})

var doorUp = [];
//doorUp to next level
doorUp.push({
  x: 80,
  y: 50,
  width:12,
  height: 20,
});

//////////////timer
(function(){
  var timer = window.setInterval(function() {
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      window.open("deadindex.html", "_self");
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
            window.open("surfaceindex.html", "_self");
            return;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
            player.x = 0;
            window.open("surfaceindex.html", "_self");
            return;
        } else if (dir === "t") {
            player.velY *= -1;
            player.x = 0;
            window.open("surfaceindex.html", "_self");
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
