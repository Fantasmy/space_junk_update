'use strict'

//todo var keys

function Ufo () {
  var self = this;

  self.position = {x: 250, y: 400};
  self.direction = {x: 0, y: 0}
  self.speed = 4;

  self.width = 50;
  self.height = 30;
  self.lasers = [];
  
  self.rightPressed = false;
  self.leftPressed = false;
  self.upPressed = false;
  self.downPressed = false;


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
      // self.laserSound = new Audio('url');
      // self.laserSound.play();
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
    if (self.position.x < 450) {
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
    var laser = new Laser(self.position.x + 23, self.position.y - 4);
    self.shootPressed = false;
    self.lasers.push(laser);
  }

  for (var i = 0; i < self.lasers.length; i++) {
    self.lasers[i].update();
  }

  self.purgeLasers(self.lasers);
};

Ufo.prototype.purgeLasers = function() {
  var self = this;
  self.lasers = self.lasers.filter (function(item) {
    var isYWithin = item.position.y < 500 && item.position.y >= 0;
    if (isYWithin) {
      return true;
    }
  })
}


Ufo.prototype.draw = function (ctx) {
  var self = this;
  
  
  ctx.fillStyle = 'green';
  ctx.fillRect(self.position.x, self.position.y, 50, 30);
  ctx.fill();

  // var img = new Image();
  // img.onload = function() {
  //       ctx.drawImage(self.Image, 0, 0, self.width, self.height);
  // }

  // img.src = './img/ufo.png';

  for (var i = 0; i < self.lasers.length; i++) {
    self.lasers[i].draw(ctx);
  }
};