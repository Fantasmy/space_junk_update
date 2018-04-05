'use strict'

var INITIAL_SIZE = 1;
var GROW_BY = 0.3;
var MAX_SIZE = 30;

var RANDOM_X = 5;
var RANDOM_X_OFFSET = -3;
var RANDOM_Y = 2
var RANDOM_Y_OFFSET = 0;


function Junk() {
  var self = this;

  // x, y, not close to 0
  // max grow?
  
  self.size = INITIAL_SIZE;
  self.width = self.width;
  self.heigth = self.heigth;
  self.position = {x: Math.random()*500, y: Math.random()*420};

  var x = (Math.random() * RANDOM_X) + RANDOM_X_OFFSET;
  var y = (Math.random() * RANDOM_Y) + RANDOM_Y_OFFSET;
  self.direction = {x: x, y: y};
};

Junk.prototype.update = function() {
  var self = this;

  self.position.x = self.position.x + self.direction.x;
  self.position.y = self.position.y + self.direction.y;

  if (self.size < MAX_SIZE) {
    return ((self.size = self.size +  GROW_BY )+ self.position.x); 
  } else {
    return (self.size = MAX_SIZE )+ self.position.x;
  }
};


Junk.prototype.draw = function(ctx) {
  var self = this;


  ctx.fillStyle = 'white';
  ctx.fillRect(self.position.x, self.position.y, self.size, self.size);

};