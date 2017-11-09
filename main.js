//MAZE OR SMB RipOff

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
})();

var ctx = $('#canvas')[0].getContext("2d"),
    width = 1000,
    height = 600,
    player = {
      x: width/2,
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
    keys = [],
    friction = 0.8,
    gravity = 0.3;
    sec = 60;
    score = 0;

playChar.src = "./robotSprite.png"
brickTile.src = "./bricks.jpg"
sawTile.src = "./Circular_saw_blade.png"
doorTile.src = "./Door.png"
fireTile.src = "./fire.png"

//Boxes+Platforms+Environments(Shapes go here)
var boxes = [];
boxes.push({
    x: 475,
    y: 370,
    width: 20,
    height: 180,
});
boxes.push({
    x: 900,
    y: 300,
    width: 50,
    height: 300,
});
boxes.push({
    x: 540,
    y: 350,
    width: 10,
    height: 120,
});
boxes.push({
    x: 420,
    y: 350,
    width: 10,
    height: 150,
});
boxes.push({
    x: 100,
    y: 540,
    width: 900,
    height: 20,
});
boxes.push({
    x: 820,
    y: 320,
    width: 40,
    height: 20,
});
boxes.push({
    x: 0,
    y: 0,
    width: 40,
    height: 100,
});
boxes.push({
    x: 0,
    y: 100,
    width: 40,
    height: 100,
});
boxes.push({
    x: 0,
    y: 200,
    width: 40,
    height: 100,
});
boxes.push({
    x: 0,
    y: 300,
    width: 40,
    height: 100,
});
boxes.push({
    x: 0,
    y: 400,
    width: 40,
    height: 100,
});
boxes.push({
    x: 0,
    y: 500,
    width: 40,
    height: 100,
});
boxes.push({
    x: 0,
    y: 300,
    width: 300,
    height: 50,
});
boxes.push({
    x: 20,
    y: 560,
    width: 60,
    height: 40,
});
boxes.push({
    x: 0,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 150,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 300,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 450,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 600,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 750,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 900,
    y: 0,
    width: 150,
    height: 50,
});
boxes.push({
    x: 950,
    y: 0,
    width: 50,
    height: 100,
});
boxes.push({
    x: 950,
    y: 100,
    width: 50,
    height: 100,
});
boxes.push({
    x: 950,
    y: 200,
    width: 50,
    height: 100,
});
boxes.push({
    x: 950,
    y: 300,
    width: 50,
    height: 100,
});
boxes.push({
    x: 950,
    y: 400,
    width: 50,
    height: 100,
});
boxes.push({
    x: 950,
    y: 500,
    width: 50,
    height: 100,
});

var fireboxes = [];
//fireboxes go here
fireboxes.push({
  x: 140,
  y: 530,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 155,
  y: 530,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 170,
  y: 530,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 185,
  y: 530,
  width: 15,
  height: 15,
});
fireboxes.push({
  x: 900,
  y: 294,
  width: 14,
  height: 15,
});
fireboxes.push({
  x: 914,
  y: 294,
  width: 14,
  height: 15,
});
fireboxes.push({
  x: 928,
  y: 294,
  width: 13,
  height: 15,
});
fireboxes.push({
  x: 941,
  y: 294,
  width: 13,
  height: 15,
});

var sawboxes = [];
//sawboxes
sawboxes.push({
  x: 450,
  y: 350,
  width: 65,
  height: 65,
});

var doorUp = [];
//doorUp to next level
doorUp.push({
  x: 830,
  y: 300,
  width:12,
  height: 20,
});
////////////////////////////////////////////////////
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
                window.open("indexlevel2.html", "_self");
                return;
            } else if (dir === "b") {
                player.grounded = true;
                player.jumping = false;
                alert("Well Done")
                player.x = 0;
                window.open("indexlevel2.html", "_self");
                return;
            } else if (dir === "t") {
                player.velY *= -1;
                alert("Well Done")
                player.x = 0;
                window.open("indexlevel2.html", "_self");
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
