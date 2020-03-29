let canvas;
let ctx;
//We could bind this constants to HTML inputs or randomize them on every page load
const strokeWidth = 2;
const animationSteps = 10;
let frame = 1;
let points = [];

function initCanvas() {
  canvas = document.getElementById("print10canvas");
  ctx = canvas.getContext("2d");
  print10();
}

function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = strokeWidth;
  ctx.stroke();
}

function print10() {
  const spacing = 20;
  const chance = 0.5;

  for (y = 0; y < canvas.height; y += spacing) {
    for (x = 0; x < canvas.width; x += spacing) {
      if (Math.random() >= chance) {
        drawLine(x, y, x + spacing, y + spacing);
      } else {
        drawLine(x + spacing, y, x, y + spacing);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", initCanvas);
