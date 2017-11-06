(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

var ctx = $('#canvas')[0].getContext("2d"),
    width = 1000,
    height = 400,
    player = {
      x: width/2,
      y: height - 5,
      width: 10,
      height: 18,
      speed: 3,
      velX: 0,
      velY: 0,
      jumping: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.4,
    speed = 3,
    velX = 0;

var boxes = []

//Boxes+Platforms(Shapes go here)
boxes.push({
    x: 100,
    y: 370,
    width: 200,
    height: 50
});
boxes.push({
    x: 900,
    y: 100,
    width: 50,
    height: 300
});
boxes.push({
    x: 200,
    y: 300,
    width: 50,
    height: 50
});

canvas.width = width;
canvas.height = height;

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
        if (player.velX < player.speed && player.x < 700) {
            player.velX++;
          } else if ( player.velX < player.speed && player.x >= 700) {
            boxes.velX--;

          }
    }

    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed && player.x > 200) {
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

    if (keys[40] && keys[39] && player.x < 700){
        //slide
        player.speed = 5
        player.velX++
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
  ctx.clearRect(0,0,width,height,0,0);
  ctx.fillStyle = "black";
  ctx.beginPath();
  for (var i = 0; i < boxes.length; i++) {
      ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height, boxes[i].speed, boxes[i].velX);
  }

  player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height, boxes[i].speed, boxes[i].velX);

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

  ctx.fill();
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  //////////////

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
