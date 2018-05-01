function Wall(x, y, width, height, color = "blue") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bound = 0;
    this.defaultColor = color;
    this.color = this.defaultColor;
}