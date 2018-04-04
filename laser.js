'use srict'

function Laser () {
    var self = this;

    self.position = {x: 250, y: 500};
    self.direction = {x: 0, y: -2};

    self.shootPressed = false;

    self.keyDownHandler = function(event) {
        if(event.keyCode === 32) {
            self.shootPressed = true;
        }
    }

    self.keyUpHandler = function(event) {
        if(event.keyCode === 32) {
            self.shootPressed = false;
        }
    }

    document.addEventListener('keydown', self.keyDownHandler, false);
    document.addEventListener('keyup', self.keyUpHandler, false);

}

Laser.prototype.update = function() {
    var self = this;

    // if(self.shootPressed === true) {
    //     return self.position.y = self.position.y + self.direction.y


    self.position.x = 0;
    self.position.y = self.position.y + self.direction.y;

}


Laser.prototype.draw = function(ctx) {
    var self = this;

    if(self.shootPressed === true) {
        ctx.fillRect = (self.position.x, self.position.y);
    }

}