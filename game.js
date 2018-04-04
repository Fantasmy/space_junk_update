'use strict'

var INTERVAL_BETWEEN_JUNK = 300;

function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.junk = [];
  self.gameScreenElement = null;
  self.ufo = new Ufo;
  // self.laser = new Laser;
  // self.fuel = new Fuel;
  self.keyUpHandler = false;
  self.keyDowHandler = false;

};

Game.prototype.build = function() {
  var self = this;

  self.gameScreenElement = createHtml(`
    <div class= "game-screen">
      <canvas width="500" height="500"></canvas>
    </div>
  `);
  self.parentElement.appendChild(self.gameScreenElement);

  self.canvas = self.gameScreenElement.querySelector('canvas');
  self.ctx = self.canvas.getContext('2d')
};


Game.prototype.start = function() { 
  var self = this;

  // window.setInterval (function () {

  //   var junk = new Junk();
  //   self.junk.push(junk);
  // }, 2000);

  window.setInterval (function() {

    var junk = new Junk();
    self.junk.push(junk);
  }, INTERVAL_BETWEEN_JUNK);


  // var junk = new Junk();
  // self.junk.push(junk);

  self.frame();
};

Game.prototype.frame = function() {
  var self = this;

  for (var i = 0; i < self.junk.length; i++) {
    self.junk[i].update();
  }
  
  self.ufo.update();

  // self.laser.update();

  // self.fuel.update();

  self.purgeJunk();

  // self.purgeLaser();

  // self.collision();


  self.ctx.clearRect(0, 0, 500, 500);

  for (var i = 0; i < self.junk.length; i++) {
    self.junk[i].draw(self.ctx);
  }

  self.ufo.draw(self.ctx);

  // self.laser.draw(self.ctx);

  // self.fuel.draw(self.ctx);

  self.score();

  window.requestAnimationFrame(function () {
    self.frame();
  })

};

Game.prototype.score = function() {
  var self = this;

  self.score = function draw () {
    self.ctx.font = '38px serif';
    self.ctx.fillStyle = 'red';
    self.ctx.fillText('Score: 0', 10, 40);    
  }

};

Game.prototype.purgeJunk = function() {
  var self = this;

  self.junk = self.junk.filter (function(junk) {
    var isXwithin = junk.position.x < 500 && junk.position.x >= 0;
    var isYWithin = junk.position.y < 500 && junk.position.y >= 0;
    if (isXwithin && isYWithin) {
      return true;
    }
  })
};

// Game.prototype.purgeLaser = function() {
//   var self = this;

//   self.laser = self.laser.filter (function(laser) {
//     var isXwithin = laser.position.x < 500 && laser.position.x >=0;
//     var isYWithin = laser.position.y < 500 && laser.position.y >= 0;
//       if(isXwithin && isYWithin) {
//         return true;
//       }
//   })
// }



// Game.prototype.collision = function() {

// }

Game.prototype.onEnded = function() {
  var self = this;
  
  
};

Game.prototype.destroy = function() {
  var self = this;

  self.gameScreenElement.remove();
};
