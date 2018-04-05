'use srict'

function Laser (x, y) {
  var self = this;

  self.position = {x: x, y:y}
  self.direction = {x: 0, y: -2};
}

Laser.prototype.update = function() {
  var self = this;

  console.log("update a laser")

  self.position.y = self.position.y + self.direction.y--;
}


Laser.prototype.draw = function(ctx) {
  var self = this;

  console.log("draw a laser")

  ctx.fillStyle = 'red';
  ctx.fillRect(self.position.x, self.position.y, 5, 8);
}