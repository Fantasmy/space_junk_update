'use strict'

var INTERVAL_BETWEEN_JUNK = 700;
var FUEL_PER_FRAME = 0.1;
var COLLISION_PENALTY = 1;
var HIT_POINTS = 10; 
var FUEL_ENERGY = 100;

function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.junk = [];
  self.gameScreenElement = null;
  self.ufo = new Ufo;
  self.fuel = new Fuel;
  self.earth = new Earth;
  self.keyUpHandler = false;
  self.keyDowHandler = false;
  self.points = 0;
  self.energy = 1000;
  self.laser = [];
  self.laser = new Laser(self.ufo.position.x + 23, self.ufo.position.y - 4);  
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

  self.createJunkIntervalId = window.setInterval (function() {

    var junk = new Junk();
    self.junk.push(junk);
  }, INTERVAL_BETWEEN_JUNK);

  self.frame();
};


Game.prototype.frame = function() {
  var self = this;

  for (var i = 0; i < self.junk.length; i++) {
    self.junk[i].update();
  }

  self.energy = Math.floor(self.energy - FUEL_PER_FRAME);

  if (self.energy < 0) {
    self.callback(self.points);
    return;
  }

  self.ufo.update();

  self.earth.update();

  self.purgeJunk();


  self.ctx.clearRect(0, 0, 500, 500);

  self.earth.draw(self.ctx);

  for (var i = 0; i < self.junk.length; i++) {
    self.junk[i].draw(self.ctx);
  }

  self.ufo.draw(self.ctx);

  self.fuel.draw(self.ctx, self.energy);

  self.score();
  self.fuelText();
  self.collisionUfo();
  self.collisionLaser();


  window.requestAnimationFrame(function() {
    self.frame();
  })
};


Game.prototype.score = function() {
  var self = this;

  self.ctx.font = '30px serif';
  self.ctx.fillStyle = 'red';
  self.ctx.fillText('Score: ' + self.points, 10, 50);  
  return self.points;  
};


Game.prototype.fuelText = function() {
  var self = this;
  
  self.ctx.font = '30px serif';
  self.ctx.fillStyle = 'blue';
  self.ctx.fillText('Fuel: ' + self.energy, 300, 20);   
};


Game.prototype.purgeJunk = function() {
  var self = this;

  self.junk = self.junk.filter (function(item) {
    var isXwithin = item.position.x < 500 && item.position.x >= 0;
    var isYWithin = item.position.y < 500 && item.position.y >= 0;
    if (isXwithin && isYWithin) {
      return true;
    }
  })
};


Game.prototype.collisionUfo = function() {
  var self = this;

  self.junk.forEach(function(junk) {
    
    var ufoShape = {
      sideW: self.ufo.position.x,
      sideE: self.ufo.position.x + self.ufo.width,
      sideN: self.ufo.position.y,
      sideS: self.ufo.position.y + self.ufo.height
    }
    
    var junkShape = {
      sideW: junk.position.x,
      sideE: junk.position.x + junk.size,
      sideN: junk.position.y,
      sideS: junk.position.y + junk.size

    }

    if(junkShape.sideW < ufoShape.sideE && junkShape.sideE > ufoShape.sideW && junkShape.sideN < ufoShape.sideS && junkShape.sideS > ufoShape.sideN) {
        self.points = self.points - COLLISION_PENALTY;
      }
  })
};


Game.prototype.collisionLaser = function() {
  var self = this;

    if(self.ufo.lasers) {
      self.ufo.lasers.forEach(function(laser, indexLaser) {

      var laserShape = {
        sideW: laser.position.x,
        sideE: laser.position.x + laser.width,
        sideN: laser.position.y,
        sideS: laser.position.y + laser.height
      }
    
      self.junk.forEach(function(junk, indexJunk) {
          
          var junkShape = {
            sideW: junk.position.x,
            sideE: junk.position.x + junk.size,
            sideN: junk.position.y,
            sideS: junk.position.y + junk.size
          }

          if(junkShape.sideW < laserShape.sideE && junkShape.sideE > laserShape.sideW && junkShape.sideN < laserShape.sideS && junkShape.sideS > laserShape.sideN) {
            self.junk.splice(indexJunk, 1);
            self.ufo.lasers.splice(indexLaser, 1);
            self.points += 50;
            self.energy += 100;
          }
        });
      });
    }
};


Game.prototype.onEnded = function(cb) {
  var self = this;
  
  // window.clearInterval(self.createJunkIntervalId);
  self.callback = cb; 
  
};


Game.prototype.destroy = function() {
  var self = this;

  self.gameScreenElement.remove();
};
