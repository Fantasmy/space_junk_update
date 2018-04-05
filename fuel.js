'use strict'

// var INITIAL_SIZE = 100;
// var GROW_BY = -0.5;
// var MAX_SIZE = 100;

function Fuel() {
  var self = this;

//   self.position.x = 250,
//   self.position.y = 20;

  self.speed = 1;

  self.value = 100;
  self.targetValue = 0;

//   self.size = INITIAL_SIZE;
//   self.width = self.width;
//   self.heigth = self.heigth;
//   self.position = {x: 450, y: 50};

//   self.direction = {x: 0, y: 0};
};

Fuel.prototype.update = function() {
  var self = this;

  self.move();
  self.draw();
//   self.size = self.size +  GROW_BY;

//   self.direction = {x: self.direction.x--, y: 0};
};

Fuel.prototype.change = function() {
  var self = this;

  self.targetValue -= amount;
};

Fuel.prototype.move = function() {
  var self = this;

  if (Math.abs(self.value - self.targetValue) < self.speed) {
    self.value = self.targetValue; 
  }
  else if (self.targetValue > self.value) {
    self.value += self.speed; 
  }
  else {
    self.value -= self.speed;
  } 
};

Fuel.prototype.draw = function(ctx) {
  var self = this;

  ctx.fillStyle = 'blue';
  ctx.fillRect(410, 25, 100, 20);
};