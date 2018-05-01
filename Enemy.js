function Enemy(x, y, speed) {
    this.isAlive = true;
    this.x = x;
    this.vx = this.x;
    this.y = y;
    this.vy = this.y;
    this.movepower = speed;
    this.speed = this.movepower;
    this.color = "pink";

    this.ajustX = function(_w) {
        this.changeX(_w);
        this.turnX();
    }

    this.turnX = function() {
        if (this.directionX == "←") {
            this.speed = Math.abs(this.movepower);
        }
        else if (this.directionX == "→") {
            this.speed = - Math.abs(this.movepower);
        }
    }
}