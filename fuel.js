'use strict'

var INITIAL_SIZE = 100;
var GROW_BY = -0.5;
var MAX_SIZE = 100;

function Fuel() {
  var self = this;


  self.size = INITIAL_SIZE;
  self.width = self.width;
  self.heigth = self.heigth;
  self.position = {x: 450, y: 50};

  self.direction = {x: 0, y: 0};
};

Fuel.prototype.update = function() {
  var self = this;

  self.size = self.size +  GROW_BY;

  self.direction = {x: self.direction.x--, y: 0};
};


Fuel.prototype.draw = function(ctx) {
  var self = this;


  ctx.fillStyle = 'red';
  ctx.fillRect(self.position.x, self.position.y, self.size, self.size);

};

/*

// var INITIAL_SIZE = 100;
var GROW_BY = -0.001;

function Fuel() {
    var self = this;

    // self.size = INITIAL_SIZE;
    self.position = {x: 400, y:50};
    // self.direction = {x: 0, y: 0}
    self.width = 100;
    self.height = 20;

};

Fuel.prototype.update = function() {
    var self = this;

    self.size = self.size;

    self.position = {x:400, y:50}
    // self.position.x = self.position.x + self.direction.x;
    // self.position.y = self.position.y + self.direction.y;
    self.width = function (ctx) {
        if(self.width >= 0) {
            return self.width = (self.width + GROW_BY);
        } else {
            return console.log('Game OVER');
        }
    }


};


Fuel.prototype.draw = function(ctx) {
    var self = this;

    ctx.fillStyle = 'red';
    ctx.fillRect(self.position.x, self.position.y, 100, 20)
    ctx.fill();
}
*/