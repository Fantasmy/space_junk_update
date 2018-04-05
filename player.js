'use strict'

function Ufo () {
  var self = this;

  self.position = {x: 250, y: 400};
  self.direction = {x: 0, y: 0}
  self.speed = 2;

  self.width = 30;
  self.height = 30;
  self.lasers = [];
  // self.xSpeed = 2;
  // self.ySpeed = 2;


  
  self.rightPressed = false;
  self.leftPressed = false;
  self.upPressed = false;
  self.downPressed = false;
  // self.shootPressed = false;

  self.keyDownHandler = function(event) {
    if(event.keyCode === 39) {
      self.rightPressed = true;
    } else if(event.keyCode === 37) {
      self.leftPressed = true;
    } else if(event.keyCode === 38) {
      self.upPressed = true;
    } else if(event.keyCode === 40) {
      self.downPressed = true;
    } else if(event.keyCode === 32) {
      self.shootPressed = true;
    }
  }

  self.keyUpHandler = function(event) {
    if(event.keyCode === 39) {
      self.rightPressed = false;
    } else if(event.keyCode === 37) {
      self.leftPressed = false;
    } else if(event.keyCode === 38) {
      self.upPressed = false;
    } else if(event.keyCode === 40) {
      self.downPressed = false;
    }
  }

  document.addEventListener('keydown', self.keyDownHandler, false);
  document.addEventListener('keyup', self.keyUpHandler, false);
};


Ufo.prototype.update = function() {
  var self = this;

  if (self.rightPressed === true) {
    if (self.position.x < 470) {
      self.position.x = self.position.x + self.speed;
    };

  } else if (self.leftPressed === true) {
    if (self.position.x >= 0){
      self.position.x = self.position.x - self.speed;
    } 

  } else if(self.upPressed === true) {
    if (self.position.y >= 0) {
      self.position.y = self.position.y - self.speed;
    }
    
  } else if(self.downPressed === true) {
    if (self.position.y < 470) {
      self.position.y = self.position.y + self.speed;
    } 
  }

  if (self.shootPressed === true) {
    var laser = new Laser(self.position.x, self.position.y);
    self.shootPressed = false;
    self.lasers.push(laser);
  }

  for (var i = 0; i < self.lasers.length; i++) {
    self.lasers[i].update();
  }
};


Ufo.prototype.draw = function (ctx) {
  var self = this;
  // self.deltaX = 0;
  // self.deltaY = 0;

  ctx.fillStyle = 'green';
  ctx.fillRect(self.position.x, self.position.y, 30, 30);
  // ctx.beginPath();
  // ctx.moveTo(250 , 250 );
  // ctx.lineTo(250 , 750 );
  // ctx.lineTo(75 , 500 );
  // ctx.closePath();
  ctx.fill();

  for (var i = 0; i < self.lasers.length; i++) {
    self.lasers[i].draw(ctx);
  }
 
  
};