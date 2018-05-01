function Charactor(x, y) {
    this.x = x;
    this.vx = this.x;
    this.y = y;
    this.vy = this.y;
    this.width = 24;
    this.height = 24;
    this.speed = 0;
    this.onGround = false;
    this.jumpspeed = 0;
    this.color = "deepskyblue"
    this.directionX = "";
    this.directionY = "";
    this.preDirectionX = "";
    this.preDirectionY = "";
    this.preOnGround = false;

    this.preMove = function () {
        this.preOnGround = this.onGround;
        this.preMoveX();
        this.preMoveY();
        this.onGround = false;
    }

    this.ajustMovePoint = function (_w) {
        if (this.isWallCollisionX(_w)) {
            this.ajustX(_w);
        }
        if (this.isWallCollisionY(_w)) {
            this.ajustY(_w);
        }
        
        if (this.isWallCollisionVX(_w)) {
            this.ajustX(_w);
        }
        if (this.isWallCollisionVY(_w)) {
            this.ajustY(_w);
        }
    }

    this.ajustX = function (_w) {
        this.changeX(_w);
    }

    this.ajustY = function (_w) {
        this.changeY(_w);
    }

    this.move = function () {
        this.x = this.vx;
        this.y = this.vy;
    }

    this.getDirection = function() {
        this.getDirectionX();
        this.getDirectionY();
    }

    this.preMoveX = function () {
        this.vx += this.speed;
    }

    this.preMoveY = function () {
        this.jumpspeed -= gravity.g;
        this.vy -= this.jumpspeed;
    }

    this.getDirectionX = function() {
        if (this.x > this.vx) {
            this.directionX = "←";
        }
        else if (this.x < this.vx) {
            this.directionX = "→";
        }
        else {
            this.directionX = " ";
        }

        this.preDirectionX = this.directionX;
    }

    this.getDirectionY = function() {
        if (this.y > this.vy) {
            this.directionY = "↑";
        }
        else if (this.y < this.vy) {
            this.directionY = "↓";
        }
        else {
            this.directionY = " ";
        }

        this.preDirectionY = this.directionY;
    }

    this.isCollision = function(_w) {
        return (this.isTouchingX(_w) && this.isTouchingY(_w));
    }

    this.isTouchingVX = function(_w) {
        return (this.vx < _w.x + _w.width && this.vx + this.width > _w.x);
    }

    this.isTouchingX = function(_w) {
        return (this.x < _w.x + _w.width && this.x + this.width > _w.x);
    }

    this.isTouchingMoveRight = function(_w) {
        return (this.x + this.width <= _w.x && _w.x < this.vx + this.width);
    }

    this.isTouchingMoveLeft = function(_w) {
        return (_w.x + _w.width <= this.x && this.vx < _w.x + _w.width);
    }

    this.isTouchingVY = function(_w) {
        return (this.vy < _w.y + _w.height && this.vy + this.height > _w.y);      
    }

    this.isTouchingY = function(_w) {
        return (this.y < _w.y + _w.height && this.y + this.height > _w.y);
    }

    this.isTouchingMoveUp = function(_w) {
        return (_w.y + _w.height <= this.y && this.vy < _w.y + _w.height);
    }

    this.isTouchingMoveDown = function(_w) {
        return (this.y + this.height <= _w.y && _w.y < this.vy + this.height); 
    }

    this.isWallCollisionX = function(_w) {

        if (this.isTouchingY(_w)) {
            if (this.directionX == "→") {
                return this.isTouchingMoveRight(_w);
            }
            if (this.directionX == "←") {
                return this.isTouchingMoveLeft(_w);
            }
        }
        return false;
    }

    this.isWallCollisionY = function(_w) {

        if (this.isTouchingX(_w)) {
            if (this.directionY == "↑") {
                return this.isTouchingMoveUp(_w);
            }
            if (this.directionY == "↓") {
                return this.isTouchingMoveDown(_w);
            }
        }
        return false;
    }

    this.isWallCollisionVX = function(_w) {

        if (this.isTouchingVY(_w)) {
            if (this.directionX == "→") {
                return this.isTouchingMoveRight(_w);
            }
            if (this.directionX == "←") {
                return this.isTouchingMoveLeft(_w);
            }
        }
        return false;
    }

    this.isWallCollisionVY = function(_w) {

        if (this.isTouchingVX(_w)) {
            if (this.directionY == "↑") {
                return this.isTouchingMoveUp(_w);
            }
            if (this.directionY == "↓") {
                return this.isTouchingMoveDown(_w);
            }
        }
        return false;
    }

    this.changeX = function(_w) {
        if (this.directionX == "→") {
            this.vx = _w.x - this.width;
            this.speed = _w.bound;
            this.directionX = " ";
        }
        else if (this.directionX == "←") {
            this.vx = _w.x + _w.width;
            this.speed = _w.bound;
            this.directionX = " ";
        }
    }

    this.changeY = function(_w) {
        if (this.directionY == "↓") {
            this.vy = _w.y - this.height;
            this.jumpspeed = 0;
            this.isJump = false;
            this.onGround = true;
            this.directionY = " ";
        }
        else if (this.directionY == "↑") {
            this.vy = _w.y + _w.height;
            this.jumpspeed = 0;
            this.directionY = " ";
        }
    }
}