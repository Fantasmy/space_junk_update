'use strict'

function Ufo () {
    var self = this;

    self.position = {x: 250, y: 400};
    self.direction = {x: 0, y: 0}
    self.width = self.width;
    self.height = self.height;
    // self.xSpeed = 2;
    // self.ySpeed = 2;


    
    self.rightPressed = false;
    self.leftPressed = false;
    self.upPressed = false;
    self.downPressed = false;

    self.keyDownHandler = function(event) {
        if(event.keyCode === 39) {
            self.rightPressed = true;
        } else if(event.keyCode === 37) {
            self.leftPressed = true;
        } else if(event.keyCode === 38) {
            self.upPressed = true;
        } else if(event.keyCode === 40) {
            self.downPressed = true;
        }
    }

    self.keyUpHandler = function(event) {
        if(event.keyCode === 39) {
            self.rightPressed = false;
        } else if(event.keyCode === 37) {
            self.leftPressed = false;
        } else if(event.keyCode === 38) {
            self.upPressed = false;
        } else if(event.keyCode === 40) {
            self.downPressed = false;
        }
    }

    document.addEventListener('keydown', self.keyDownHandler, false);
    document.addEventListener('keyup', self.keyUpHandler, false);


};

Ufo.prototype.update = function() {
    var self = this;

    // self.xSpeed = 2;
    // self.ySpeed = 2;

    // WITHPOUT LIMITS
    // if(self.rightPressed === true) {
    //     return self.position.x++;
    // } else if(self.leftPressed === true) {
    //     return self.position.x--;
    // } else if(self.upPressed === true) {
    //     return self.position.y--;
    // } else if(self.downPressed === true) {
    //     return self.position.y++;
    // }

    if(self.rightPressed === true) {
        if(self.position.x < 470) {
            return self.position.x++;
        } else return self.position.x--;

    } else if(self.leftPressed === true) {
        if(self.position.x >= 0){
            return self.position.x--;
        } else return self.position.x++;

    } else if(self.upPressed === true) {
        if(self.position.y >= 0) {
            return self.position.y--;
        } else return self.position.y++;
        
    } else if(self.downPressed === true) {
        if(self.position.y < 430) {
            return self.position.y++;
        } else return self.position.y--;
    }


//     var position = Camera.main.WorldToViewportPoint(transform.position);
// position.x = Mathf.Clamp(position.x, 0.1, 0.9);
// position.y = Mathf.Clamp(position.y, 0.1, 0.9);
// transform.position = Camera.main.ViewportToWorldPoint(pos);

};


Ufo.prototype.draw = function (ctx) {
    var self = this;
    // self.deltaX = 0;
    // self.deltaY = 0;

    ctx.fillStyle = 'green';
    ctx.fillRect(self.position.x, self.position.y, 30, 30);
    // ctx.beginPath();
    // ctx.moveTo(250 , 250 );
    // ctx.lineTo(250 , 750 );
    // ctx.lineTo(75 , 500 );
    // ctx.closePath();
    ctx.fill()
    
};



