// animate the pattern from top to bottom
class tenPrintCol {
  animationSteps = 30;
  points = [];
  frame = 1;
  length;
  tpCan;
  xPos;

  constructor(length, tpCan, xPos) {
    this.length = length;
    this.tpCan = tpCan;
    this.xPos = xPos;
    this.createPattern();
    this.run();
  }

  createPattern() {
    // handle delay:
    for (let i = 0; i < this.xPos / 2; i++) {
      this.points.push({ x: 0, y: 0, isBreak: true });
    }

    for (let y = 0; y < this.length; y += this.tpCan.spacing) {
      if (Math.random() >= this.tpCan.chance) {
        this.createPoints(
          this.xPos,
          y,
          this.xPos + this.tpCan.spacing,
          y + this.tpCan.spacing
        );
      } else {
        this.createPoints(
          this.xPos + this.tpCan.spacing,
          y,
          this.xPos,
          y + this.tpCan.spacing
        );
      }
    }
  }

  createPoints(startX, startY, endX, endY) {
    for (let i = 0; i < this.animationSteps; i++) {
      this.points.push({
        x: startX + i * ((endX - startX) / this.animationSteps),
        y: startY + i * ((endY - startY) / this.animationSteps)
      });
    }
    this.points.push({
      x: endX,
      y: endY,
      isBreak: true
    });
  }

  animate() {
    this.tpCan.drawLine(
      this.points[this.frame - 1].x,
      this.points[this.frame - 1].y,
      this.points[this.frame].x,
      this.points[this.frame].y,
      this.points[this.frame - 1].isBreak
    );
    this.frame++;
    if (this.frame < this.points.length) {
      window.requestAnimationFrame(this.animate.bind(this));
    }
  }
  run() {
    window.requestAnimationFrame(this.animate.bind(this));
  }
}

class tenPrintCanvas {
  spacing;
  chance;
  canvas;
  ctx;
  cols = [];
  strokeWidth = 1;

  constructor(spacing = 40, chance = 0.5) {
    this.spacing = spacing;
    this.chance = chance;
  }

  init(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.createCols();
  }

  drawLine(startX, startY, endX, endY, isBreak) {
    if (isBreak) {
      this.ctx.closePath();
    } else {
      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.stroke();
    }
  }

  createCols() {
    for (let x = 0; x < this.canvas.width; x += this.spacing) {
      this.cols.push(new tenPrintCol(this.canvas.height, this, x));
    }
    console.log(this.cols);
  }

  clearCanvas() {
    // TODO: stop all ongoing animations!
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cols = [];
  }

  handleResize() {
    console.log("resize");
    this.canvas.width = window.innerWidth;
    this.clearCanvas();
    this.createCols();
  }
}

const tenPrint = new tenPrintCanvas();

document.addEventListener(
  "DOMContentLoaded",
  tenPrint.init.bind(tenPrint, "10print")
);

window.addEventListener("resize", tenPrint.handleResize.bind(tenPrint));
