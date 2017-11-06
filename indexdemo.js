//JQuery change works
//line:6
// var canvas = $('#canvas')[0].getContext("2d"),
//
// var canvas = document.getElementById("canvas"),
//     ctx = canvas.getContext("2d"),

<!-- -------------------------------------------- -->

//JQuery change works
//line:73 -> 79
// $(this).on("keydown", function(e){
//   keys[e.keyCode] = true;
// })
//
// document.body.addEventListener("keydown", function(e) {
//     keys[e.keyCode] = true;
// });
//
// $(this).on("keyup", function(e){
//   keys[e.keyCode] = false;
// })
//
// document.body.addEventListener("keyup", function(e) {
//     keys[e.keyCode] = false;
// });

<!-- -------------------------------------------- -->

//JQuery change works
//line:81 -> 83
// $(this).on("load", function(){
//   update();
// })
//
// window.addEventListener("load",function(){
//     update();
// });

<!-- -------------------------------------------- -->

ctx.fillStyle = "black";
ctx.beginPath();
for (var i = 0; i < boxes.length; i++) {
    ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
}
ctx.fill();

<!-- -------------------------------------------- -->

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)         var oX = hWidths - Math.abs(vX),             oY = hHeights - Math.abs(vY);         if (oX >= oY) {
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
