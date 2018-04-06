'use strict'

function Fuel() {
  var self = this;

  self.position = {x: 300, y: 30};
  self.direction = {x: 0, y: 0};
  self.width = 100;
  self.height = 20;

};


Fuel.prototype.draw = function(ctx, fuel) {
  var self = this;

  self.width = fuel/5;

  ctx.fillStyle = 'blue';
  ctx.fillRect(self.position.x, self.position.y, self.width, self.height);

}; 