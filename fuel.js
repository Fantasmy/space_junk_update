'use strict'

var INITIAL_SIZE = 100;
var DECREASE_BY = 0.001;

function Fuel() {
    var self = this;

    self.size = INITIAL_SIZE;
    self.position = {x: 450, x:20};

}

Fuel.prototype.update = function() {
    var self = this;

    self.size = self.size - DECREASE_BY;

    self.position.x = self.position.x;
    self.position.y = self.position.y;
}


Fuel.prototype.draw = function(ctx) {
    var self = this;

    ctx.fillStyle = 'blue';
    ctx.fillRect(self.position.x, self.position.y, 10, 100)
}