function Player(x, y) {
    this.x = x;
    this.vx = this.x;
    this.y = y;
    this.vy = this.y;
    this.maxspeed = 30;
    this.movepower = 2;
    this.offset = 192;
    this.moveL = false;
    this.moveR = false;
    this.isJump = false;
    this.jumppower = 40;
    this.isEven = function () {
        return true;
    }
    this.preMoveX = function () {
        if (this.moveR) {
            this.speed += this.movepower;
            if (this.speed > this.maxspeed) {
                this.speed = this.maxspeed;
            }
        }
        if (this.moveL) {
            this.speed -= this.movepower;
            if (this.speed < -this.maxspeed) {
                this.speed = -this.maxspeed;
            }
        }

        if (!this.moveR && this.speed >= 0) {
            this.speed -= gravity.masatsu;
            if (this.speed < 0) {
                this.speed = 0;
            }
        }
        if (!this.moveL && this.speed <= 0) {
            this.speed += gravity.masatsu;
            if (this.speed > 0) {
                this.speed = 0;
            }
        }

        this.vx += this.speed;
    }

    this.preMoveY = function () {
        this.jumpspeed -= gravity.g;

        if (this.onGround && this.isJump) {
            this.jump();
        }
        this.vy -= this.jumpspeed;
    }

    this.jump = function() {
        this.jumpspeed = this.jumppower;
        this.onGround = false;
    }

    this.ajustX = function(_w) {
        this.changeColorForCollitionWall(_w);
        this.changeX(_w);
    }

    this.ajustY = function(_w) {
        this.changeColorForCollitionWall(_w);
        this.changeY(_w);    
    }
    
    this.changeColorForCollitionWall = function(_w) {
        _w.color = "aquamarine";
    }

}

