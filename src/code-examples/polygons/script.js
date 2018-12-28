var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var width = canvas.width;
var height = canvas.height;

var r = height / 4;

drawRegularPolygon(ctx, width/2 - 4 * r, height / 2, 3, r, Math.PI, true, '#bad', true, '#0fa', 5);
drawRegularPolygon(ctx, width/2 - 2 * r, height/2, 4, r, Math.PI/4, true, '#fda', true, '#dadada', 3);
drawRegularPolygon(ctx, width/2, height/2, 5, r, Math.PI, true, '#ada', true, '#000', 1);
drawRegularPolygon(ctx, width/2 + 2 * r, height/2, 6, r, Math.PI, true, '#de6', false);
drawRegularPolygon(ctx, width/2 + 4 * r, height/2, 7, r, Math.PI, true, '#206', false);

function drawRegularPolygon(context, x, y, sides, radius, offset, fill, fillColor, stroke, strokeColor, strokeWidth) {
  var vertices = generatePoints(x,y,sides,radius,offset);
  context.beginPath(vertices[0][0], vertices[0][1]);
  for (var i = 0; i < vertices.length; i++) {
    context.lineTo(vertices[i][0], vertices[i][1]);
  }
  context.lineTo(vertices[0][0], vertices[0][1]);
  context.closePath();
  if (fill == true) {
    context.fillStyle = fillColor;
    context.fill();
  }

  if (stroke == true) {
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    context.stroke();
  }
}

function drawRegularPolygonSplit(context, x, y, sides, radius, offset, fill, fillColors, stroke, strokeColors, strokeWidth) {
  var vertices = generatePoints(x,y,sides,radius,offset);

  for (var i = 0; i < vertices.length; i++) {
    context.beginPath(x,y);
    context.lineTo(vertices[i][0], vertices[i][1]);
    context.lineTo(vertices[(i+1) % vertices.length][0], vertices[(i + 1) % vertices.length][1]);
    context.lineTo(x,y);
    context.closePath()

    if (fill == true) {
      context.fillStyle = fillColors[i];
      context.fill();
    }

    if (stroke == true) {
      context.strokeStyle = strokeColors[i];
      context.lineWidth = strokeWidth;
      context.stroke()
    }
  }
}

function generatePoints(x,y,sides,radius,offset) {
  var angle = 2 * Math.PI / sides;
  var points = [];

  for (var i = 0; i < sides; i++) {
    var single = [];
    var verticeX = x + radius * Math.sin((i * angle));
    var verticeY = y + radius * Math.cos((i * angle) + offset);

    single.push(verticeX);
    single.push(verticeY);
    points.push(single);
  }
  return points
}