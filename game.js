"use strict";

var ctx, canvas, scroll, clock = 0, mainT = NaN;
var player, enemys = [], gravity, walls = [], score = 0, stage = 1;

var keyState = new Array(244);
var sendKey = {};

function Gravity(m, g) {
    this.masatsu = m;
    this.g = g;
}

function Scroll(x, x_end) {
    this.x = x;
    this.x_end = x_end;
}

function Canvas(w, h) {
    this.width = w;
    this.height = h;            
}

// var bitmap = {
//     draw: function (ctx) {
//         if (!this.strip) {
//             this.strip = document.getElementById('strip');
//         }
//         ctx.drawImage(this.strip, this.offset + (this.isEven() ? 0 : 24), 0, 24, 24, this.x - scroll.x, this.y, 24, 24);
//     }
// }

function Bitmap() {
    this.draw = function (ctx) {
        if (!this.strip) {
            this.strip = document.getElementById('strip');
        }
        ctx.drawImage(this.strip, this.offset + (this.isEven() ? 0 : 24), 0, 24, 24, this.x - scroll.x, this.y, 24, 24);
    }
}

function Fill() {
    this.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - scroll.x, this.y, this.width, this.height);
    }
}

function rand(max) {
    return Math.floor(Math.random() * max);
}

// 初期化
function init() {

    settingNewCanvas();
    settingContext();

    score = 0, stage = 1;

    // special thanks: http://www.cg.is.sci.toho-u.ac.jp/pukiwiki/index.php?JavaScript%2F%E5%90%8C%E6%99%82%E6%8A%BC%E3%81%97%E3%81%8C%E5%8F%AF%E8%83%BD%E3%81%AA%E3%82%AD%E3%83%BC%E5%85%A5%E5%8A%9B%E5%87%A6%E7%90%86

    addEventListener('keydown', function (e) { keyState[e.keyCode] = 1; }, false);
    addEventListener('keyup', function (e) { keyState[e.keyCode] = 0; }, false);

    start();
}

function settingNewCanvas() {
    var view = document.getElementById('canvas');
    canvas = new Canvas(400, 400);
    view.setAttribute("width", canvas.width);
    view.setAttribute("height", canvas.height);
}

function settingContext() {
    ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "10pt Arial";
}


function start() {

    settingNewObject();
    settingKeyConfig();

    clock = 0;

    settingNewWalls();
    settingNewEnemys();

    if (isNaN(mainT)) {
        mainT = setInterval(mainLoop, 50);
    }
}

function settingKeyConfig() {
    sendKey['jump'] = 32; // [Space]
    sendKey['left'] = 37; // [←]
    sendKey['right'] = 39; // [→]
}

function settingNewObject() {
    Charactor.prototype = new Fill();
    Wall.prototype = new Fill();
    Player.prototype = new Charactor();
    player = new Player(40, canvas.height - 120);
    gravity = new Gravity(1, 9);
    scroll = new Scroll(0, 1000);
}

function settingNewEnemys() {
    Enemy.prototype = new Charactor();
    enemys.push(new Enemy(100, canvas.height - 120, -2));
    enemys.push(new Enemy(400, canvas.height - 120, -3));
    enemys.push(new Enemy(800, canvas.height - 120, -2));
}

function settingNewWalls() {
    // readTextFile('./test.json')
    if (stage == 0) {
        walls.push(new Wall(eval(-40), 0, 40, eval("canvas.height"), "coral"));
        walls.push(new Wall(eval("canvas.height - 10"), 300, 40, 300, "coral"));
        walls.push(new Wall(eval("canvas.height + 40"), 300, 100, 200, "coral"));
        walls.push(new Wall(0, canvas.height - 20, 300, 40, "coral"));
        walls.push(new Wall(450, canvas.height - 20, 300, 40, "coral"));
        walls.push(new Wall(150, canvas.height - 100, 50, 20, "orange"));
        walls.push(new Wall(220, canvas.height - 170, 50, 20, "orange"));
        walls.push(new Wall(360, canvas.height - 210, 100, 20, "orange"));
        walls.push(new Wall(300, canvas.height - 50, 50, 50, "coral"));
    }
    else if(stage == 1) {
        scroll.x_end = 7200;
        walls.push(new Wall(-10, 0, 10, 500, "coral"));
        walls.push(new Wall(0, canvas.height - 60, 1000, 30, "coral"));
        walls.push(new Wall(400, canvas.height - 160, 200, 30, "coral"));
        walls.push(new Wall(800, canvas.height - 90, 200, 30, "coral"));
        walls.push(new Wall(1000, canvas.height - 160, 200, 130, "coral"));
        walls.push(new Wall(1300, canvas.height - 110, 300, 130, "coral"));
        walls.push(new Wall(1600, canvas.height - 60, 600, 30, "coral"));
        walls.push(new Wall(1800, canvas.height - 190, 150, 30, "coral"));
        walls.push(new Wall(2200, canvas.height - 160, 50, 130, "coral"));
        walls.push(new Wall(2400, canvas.height - 160, 200, 130, "coral"));
        walls.push(new Wall(2600, canvas.height - 210, 500, 180, "coral"));
        walls.push(new Wall(3300, canvas.height - 210, 400, 50, "coral"));
        walls.push(new Wall(3500, canvas.height - 160, 500, 50, "coral"));
        walls.push(new Wall(4200, canvas.height - 110, 800, 80, "coral"));
        walls.push(new Wall(4850, canvas.height - 160, 200, 50, "coral"));
        walls.push(new Wall(4950, canvas.height - 180, 200, 50, "coral"));
        walls.push(new Wall(5100, canvas.height - 210, 200, 50, "coral"));
        walls.push(new Wall(5150, canvas.height - 260, 500, 100, "coral"));
        walls.push(new Wall(5850, canvas.height - 360, 100, 300, "coral"));
        walls.push(new Wall(6050, canvas.height - 310, 100, 250, "coral"));
        walls.push(new Wall(scroll.x_end, canvas.height - 560, 10, 500, "coral"));
    }
}

// function readTextFile(file) { 
//     var rawFile = new XMLHttpRequest(); 
//     rawFile.open("GET", file, false); 
//     rawFile.onreadystatechange = function () { 
//         if(rawFile.readyState === 4) { 
//             if(rawFile.status === 200 || rawFile.status == 0) { 
//                 var allText = rawFile.responseText; 
//                 alert(allText); 
//             } 
//         } 
//     } 
//     rawFile.send(null); 
// } 


function mainLoop() {
    clock++;

    getKeyStatus();
    movePlayer();
    moveEnemys();
    collitionEnemys();
    scrollView();

    if (player.y > canvas.height + 20) {
        gameOver();
    }

    draw();
}

function getKeyStatus() {
    // keyConfig            
    if (keyState[sendKey['jump']] == 1) player.isJump = true;

    if (keyState[sendKey['left']] == 1) player.moveL = true;
    if (keyState[sendKey['left']] == 0) player.moveL = false;

    if (keyState[sendKey['right']] == 1) player.moveR = true;
    if (keyState[sendKey['right']] == 0) player.moveR = false;
}


function gameOver() {
    clearInterval(mainT); mainT = NaN;
    draw();
}

function movePlayer() {

    player.preMove();
    player.getDirection();

    console.log("vx:" + player.vx + "[" + player.directionX + "]",
                "vy:" + player.vy + "[" + player.directionY + "]");

    walls.forEach(function (w) {
        
        w.color = w.defaultColor;
        player.ajustMovePoint(w);

    });

    addScore(Math.abs(player.vx - player.x));
    player.move();
    console.log(' x:' + player.x, '   ' + ' y:' + player.y, '    (move)');

}

function addScore(_value) {

    score += _value;

}



function moveEnemys() {

    enemys.forEach(function(e) {
        
        e.preMove();
        e.getDirection();
    
        walls.forEach(function (w) {
            
            e.ajustMovePoint(w);
    
        });
    
        e.move();

    });
}


function collitionEnemys() {

    enemys.forEach(function(e, e_index) {
        
        if (e.isCollision(player)) {

            if (player.preDirectionY == "↓" && !player.preOnGround) {
                deathEnemy(e, e_index);
                player.jump();
            }
            else {
                gameOver();
            }
            
        }

    })

}

function deathEnemy(_e, _e_index) {

    addScore(_e.width * _e.height);
    enemys.splice(_e_index, 1);

}

function scrollView() {
    if (player.x <= (canvas.width / 2 - player.width / 2)) {
        scroll.x = 0;
    }
    else if ((scroll.x_end - canvas.width / 2 + player.width / 2) <= player.x) {
        // ステージ右端のときはスクロールしない

    }
    else {
        // それ以外のとき
        scroll.x += player.speed;
    }
}



function draw() {

    drawBackGround();
    drawLines();
    drawWalls();
    drawEnemys();
    drawPlayer();
    drawScore();

    // if (aliens.length == 0) {
    //     drawStageClear();
    // }

    if (isNaN(mainT)) {
        drawGameover();
    }
}

function drawBackGround() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLines() {
    ctx.fillStyle = 'dimgray';
    for (var i = 0; i < canvas.height; i += 100) {
        ctx.fillRect(i, 0, 1, canvas.height);
    }
    for (var j = 0; j < canvas.width; j += 100) {
        ctx.fillRect(0, j, canvas.width, 1);
    }
}

function drawWalls() {
    walls.forEach(function (w) {
        w.draw(ctx);
    });
}

function drawPlayer() {
    player.draw(ctx);
}

function drawEnemys() {
    enemys.forEach(function (e) {
        e.draw(ctx);
    });
}

function drawStageClear() {
    ctx.fillText('STAGE CLEAR', 200, 150);
}

function drawGameover() {
    // ctx.fillText('GAME OVER', 220, 150);
    ctx.fillText('GAME OVER', canvas.width / 2 - 50, canvas.height / 2 - 100);
}

function drawScore() {
    ctx.fillStyle = 'rgb(0,255,0)';
    ctx.fillText('score : ' + ('0000000' + score).slice(-7), canvas.width - 110, 30);
    ctx.fillText(('加速度 : ' + player.speed), canvas.width - 110, 45);
    ctx.fillText(('Jump : ' + player.isJump), canvas.width - 110, 60);
    ctx.fillText(('x : ' + player.x + ' ' + player.directionX), canvas.width - 110, 75);
    ctx.fillText(('y : ' + player.y + ' ' + player.directionY), canvas.width - 110, 90);
}
