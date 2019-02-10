"use strict";
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let x = canvas.width / 2;
let y = canvas.height - 30;

function Ball(x, y, radius, dx, dy, canvasId) {
  // auto-instantiation
  // http://raganwald.com/2014/07/09/javascript-constructor-problem.html
  if (!(this instanceof Ball)) return new Ball(x, y, radius, dx, dy, canvasId);
  this.canvas = document.getElementById(canvasId);
  this.ctx = canvas.getContext('2d');
  this._width = canvas.width;
  this._height = canvas.height;
  this.dx = dx;
  this.dy = dy;

  this.radius = radius || 10;
  this.x = x || this.radius;
  this.y = y || this.radius;
  
}
Ball.prototype = {
  drawBall: function() {
    let ctx = this._ball.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = ctx.fillStyle = this.getRandomColor();
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  },
  createBall: function() {
    let ball = this._ball = document.createElement("canvas"),
    ball.width = ball.height = 2 * this.radius;
    this.drawBall();
  },
  draw: function(colorChange) {
    if(!this._ball) this.createBall();
    if(colorChange) this.drawBall();
    this.ctx.drawImage(this._ball, this.x - this.radius, this.y - this.radius);
  },
  move: function() {
    console.log(this.x, this.y, this.dx, this.dy);
    this.ctx.clearRect(this.x - this.radius, this.y - this.radius, 
      this.x + this.radius, this.y + this.radius,);
    this.x += this.dx;
    this.y += this.dy;
    this.draw(this.bounce());
  },
  bounce: function() {
    let bounce = false;
    if(this.x + this.radius >= this._width || 
      this.x - this.radius <= 0) {
      this.dx *= (-1);
      bounce = true;
    }
    if(this.y + this.radius >= this._height || 
      this.y  - this.radius <= 0) {
      this.dy *= (-1);
      bounce = true;
    }
    return bounce;
  },
  getRandomColor: function() {
    let letters = "0123456789ABCDEF";
    let color = '#';
    for(let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

let ball = new Ball(x, y, 20, -2, 1, "game");
setInterval(() => {
  ball.move();
}, 20);