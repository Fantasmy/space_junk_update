'use strict'

var INITIAL_SIZE = 1;
var GROW_BY = 0.5;
var MAX_SIZE = 15;

var RANDOM_X = 11;
var RANDOM_X_OFFSET = -6;
var RANDOM_Y = 5
var RANDOM_Y_OFFSET = 0;


function Junk() {
  var self = this;

  // x, y, not close to 0
  // max grow?
  
  self.size = INITIAL_SIZE;
  self.position = {x: Math.random()*500, y: Math.random()*500};

  var x = (Math.random() * RANDOM_X) + RANDOM_X_OFFSET;
  var y = (Math.random() * RANDOM_Y) + RANDOM_Y_OFFSET;
  self.direction = {x: x, y: y};
};

Junk.prototype.update = function() {
  var self = this;

  self.size = self.size +  GROW_BY;

  // MAXIMUM SIZE?
  // if (self.size <30) {
  //   return (self.size + GROW_BY);
  // } else return (self.size = 30);

  self.position.x = self.position.x + self.direction.x;
  self.position.y = self.position.y + self.direction.y;  
};


Junk.prototype.draw = function(ctx) {
  var self = this;


  ctx.fillStyle = 'white';
  ctx.fillRect(self.position.x, self.position.y, self.size, self.size);

}