"use strict";
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let x = canvas.width / 2;
let y = canvas.height - 30;
let rightPressed = false;
let leftPressed = false;

function Paddle(x, y, width, height, dx, dy, canvasId) {
  // auto-instantiation
  // http://raganwald.com/2014/07/09/javascript-constructor-problem.html
  if (!(this instanceof Paddle)) return new Paddle(x, y, width, height, dx, dy, canvasId);
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this._width = canvas.width;
  this._height = canvas.height;

  this.x = x;
  this.y = y;
  this.paddleWidth = width;
  this.paddleHeight = height;
  this.dx = dx;
  this.dy = dy;
}

Paddle.prototype = {
  drawPaddle: function() {
    let ctx = this._paddle.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, this.paddleWidth, this.paddleHeight);
    ctx.strokeStyle = ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  createPaddle: function() {
    let paddle = this._paddle = document.createElement("canvas");
    paddle.width = this.paddleWidth;
    paddle.height = this.paddleHeight;
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
    this.drawPaddle();
  },
  draw: function() {
    if(!this._paddle) this.createPaddle();
    this.ctx.drawImage(this._paddle, 
      this.x - (this.paddleWidth / 2), 
      this.y - (this.paddleHeight / 2));
  },
  move: function() {
    // console.log(this.rightPressed, this.leftPressed);
    this.ctx.clearRect(this.x - (this.paddleWidth / 2), 
      this.y - (this.paddleHeight / 2), 
      this.x + (this.paddleWidth / 2), 
      this.y + (this.paddleHeight / 2));
    if(rightPressed && this.x + (this.paddleWidth / 2) < this._width) {
      if(this.x + this.dx >= this._width) {
        this.x = this._width - (this.paddleWidth / 2);
      } else {
        this.x += this.dx;
      }
    }
    if(leftPressed && this.x - (this.paddleWidth / 2) > 0) {
      if(this.x - this.dx <= 0) {
        this.x = this.paddleWidth / 2;
      } else {
        this.x -= this.dx;
      }
    }
    this.draw();
  },
  keyDownHandler: function(e) {
    console.log(this);
    if(e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  },
  keyUpHandler: function(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

let paddle = new Paddle(x, y, 70, 10, 5, 5, "game");
setInterval(() => {
  paddle.move();
}, 20);