'use strict'

var INTERVAL_BETWEEN_JUNK = 700;
var FUEL_PER_FRAME = 0.1;
var COLLISION_PENALTY = 1;
var HIT_POINTS = 10; 

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

  window.setInterval (function() {

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

  // if (self.energy <= 0) {
  //   game.onEnded();
  // }

  self.ufo.update();

  self.earth.update();

  self.purgeJunk();


  // self.collisionDetection();


  self.ctx.clearRect(0, 0, 500, 500);

  self.earth.draw(self.ctx);

  for (var i = 0; i < self.junk.length; i++) {
    self.junk[i].draw(self.ctx);
  }

  self.ufo.draw(self.ctx);

  self.fuel.draw(self.ctx, self.energy);

  self.score();
  self.fuelText();
  // self.collisionLaser();
  self.collisionUfo();


  window.requestAnimationFrame(function() {
    self.frame();
  })
};


Game.prototype.score = function() {
  var self = this;

  self.ctx.font = '30px serif';
  self.ctx.fillStyle = 'red';
  self.ctx.fillText('Score: ' + self.points, 10, 50);    
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
    var ufo = {
      sideW: self.ufo.position.x,
      sideE: self.ufo.position.x + self.ufo.width,
      sideN: self.ufo.position.y,
      sideS: self.ufo.position.y + self.ufo.height
    }
    
    var junk = {
      sideW: junk.position.x,
      sideE: junk.position.x + junk.size,
      sideN: junk.position.y,
      sideS: junk.position.y + junk.size

    }

    if(junk.sideW < ufo.sideE && junk.sideE > ufo.sideW && junk.sideN < ufo.sideS && junk.sideS > ufo.sideN) {
        self.points = self.points - COLLISION_PENALTY;
      }
  })
};




Game.prototype.collisionLaser = function() {
  var self = this;

  self.junk.forEach(function(junk) {

    var laser = {
      sideW: self.laser.position.x,
      sideE: self.laser.position.x + self.laser.width,
      sideN: self.laser.position.y,
      sideS: self.laser.position.y + self.laser.height
    }
        
    var junk = {
      sideW: junk.position.x,
      sideE: junk.position.x + junk.size,
      sideN: junk.position.y,
      sideS: junk.position.y + junk.size
    }

    if(junk.sideW < laser.sideE && junk.sideE > laser.sideW && junk.sideN < laser.sideS && junk.sideS > laser.sideN) {
        consoe.log('colission');  
      // self.points = self.points + HIT_POINTS;
      }
    
  })
};



Game.prototype.onEnded = function() {
  var self = this;
  
  
};

Game.prototype.destroy = function() {
  var self = this;

  self.gameScreenElement.remove();
};
