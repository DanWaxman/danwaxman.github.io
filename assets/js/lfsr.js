var c = document.getElementById("lfsr");
var ctx = c.getContext("2d");
const BOX_WIDTH = 30;
const BOX_HEIGHT = 30;
const N_OF_REG = 5;
const START_X = 50;
const START_Y = 0;
const XOR_X = START_X + BOX_WIDTH * N_OF_REG / 2;
const XOR_Y = 105;
const ci = [1, 0, 0, 0, 1];

var registers = "10011";
var iv_val = "1";

function init() {
ctx.clearRect(0,0,500,500);
ctx.beginPath();

for (var i = 0; i < N_OF_REG; i++) {
    ctx.rect(START_X + BOX_WIDTH * i, START_Y, BOX_WIDTH, BOX_HEIGHT);
}

ctx.stroke();

for (var i = 0; i < N_OF_REG; i++) {
    ctx.beginPath();
    arrow(ctx, START_X + BOX_WIDTH * (i + 1/2) , START_Y + BOX_HEIGHT, XOR_X, XOR_Y - 5);
    if (ci[i] == 1) {
        ctx.strokeStyle = "red";
    } else {
        ctx.strokeStyle = "black";
    }
    ctx.stroke();
}

ctx.beginPath();

ctx.font = "24px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("⊕", XOR_X, XOR_Y);
iv(ctx);
arrow(ctx, START_X + BOX_WIDTH * N_OF_REG, START_Y + BOX_HEIGHT / 2, START_X + BOX_WIDTH * N_OF_REG + 50, START_Y + BOX_HEIGHT / 2);
ctx.strokeStyle = "black";
ctx.stroke();

function iv(context) {
    context.moveTo(XOR_X - 20, XOR_Y);
    context.lineTo(5, XOR_Y);
    context.lineTo(5, START_Y + BOX_HEIGHT / 2);
    arrow(context, 5, START_Y + BOX_HEIGHT / 2, START_X - 5, START_Y + BOX_HEIGHT / 2);
}


function arrow(context, fx, fy, tx, ty) {
    var headlen = 10;
    var dx = tx - fx;
    var dy = ty - fy;
    var angle = Math.atan2(dy, dx);


    tx = tx - Math.cos(angle) * 15;
    ty = ty - Math.sin(angle) * 15;
    context.moveTo(fx, fy);
    context.lineTo(tx, ty);
    context.lineTo(tx - headlen * Math.cos(angle - Math.PI / 6), ty - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tx, ty);
    context.lineTo(tx - headlen * Math.cos(angle + Math.PI / 6), ty - headlen * Math.sin(angle + Math.PI / 6));
}
}

function drawRegisters(registers, dx = 0) {
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < registers.length; i++) {
        ctx.fillText(registers[i], START_X + BOX_WIDTH * (i + 1/2) + dx, START_Y + BOX_HEIGHT / 2);
    }
    ctx.stroke();
}

function drawIv(iv, x = XOR_X, y = XOR_Y + 25) {
   ctx.font = "18px Arial";
   ctx.textAlign = "center";
   ctx.textBaseline = "middle";
   ctx.fillText(iv, x, y);
   ctx.stroke();
}
var STAGE = 0;
var iv_x = XOR_X;
var iv_y = XOR_Y + 25;
var rdx = 0;
function draw() {
    if (STAGE == 0) {
        init();
        drawRegisters(registers);
        drawIv(iv_val);
        STAGE = 1;
    } else if (STAGE == 1) {
        init();
        drawRegisters(registers);
        iv_x -= 10;
        drawIv(iv_val, iv_x, iv_y);
        if (iv_x < 20) {
            iv_x = 15;
            STAGE = 2;
        }
    } else if (STAGE == 2) {
        init();
        drawRegisters(registers);
        iv_y -= 10;
        if (iv_y < START_Y + BOX_HEIGHT / 2) {
            iv_y = START_Y + BOX_HEIGHT / 2;
            STAGE = 3;
        }
        drawIv(iv_val, iv_x, iv_y);
    } else if (STAGE == 3) {
        init();
        drawRegisters(registers);
        iv_x += 10;
        if (iv_x > START_X - BOX_WIDTH / 2) {
            iv_x = START_X - BOX_WIDTH / 2;
            STAGE = 4;
            registers = iv_val + registers;
        }
        drawIv(iv_val, iv_x, iv_y);
    } else if (STAGE == 4) {
        init();
        rdx += 10;
        if (rdx > BOX_WIDTH) {
            rdx = BOX_WIDTH;
            STAGE = 5;
        }
        drawRegisters(registers, -BOX_WIDTH + rdx);
    }
}

setInterval(draw, 200);

