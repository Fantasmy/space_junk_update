'use strict'

var RANDOM_X = 5;
var RANDOM_X_OFFSET = -3;
var RANDOM_Y = 2
var RANDOM_Y_OFFSET = 0;

function Earth() {
  var self = this;

  self.position = {x: 230, y: -0};
  self.width = 200;
  self.height = 200;

  var x = (Math.random() * RANDOM_X) + RANDOM_X_OFFSET;
  var y = (Math.random() * RANDOM_Y) + RANDOM_Y_OFFSET;
  self.direction = {x: x, y: y};

};

Earth.prototype.update = function() {
  var self = this;


  self.position = self.position + self.direction;


//   if (self.size <= MAX_SIZE) {
//     return ((self.size = self.size +  GROW_BY )); 
//   } else {
//     return (self.size = MAX_SIZE );
//   }
};


Earth.prototype.draw = function(ctx) {
  var self = this;

  ctx.fillStyle = 'blue';
  ctx.fillRect(self.position.x, self.position.y, self.width, self.height);

};