var c = document.getElementById("lfsr");
var ctx = c.getContext("2d");
const BOX_WIDTH = 30;
const BOX_HEIGHT = 30;
const N_OF_REG = 5;
const START_X = 50;
const START_Y = 0;
const XOR_X = START_X + BOX_WIDTH * N_OF_REG / 2;
const XOR_Y = 105;

function init() {
ctx.clearRect(0,0,500,500);
ctx.beginPath();

for (var i = 0; i < N_OF_REG; i++) {
    ctx.rect(START_X + BOX_WIDTH * i, START_Y, BOX_WIDTH, BOX_HEIGHT);
}

for (var i = 0; i < N_OF_REG; i++) {
    arrow(ctx, START_X + BOX_WIDTH * (i + 1/2) , START_Y + BOX_HEIGHT, XOR_X, XOR_Y - 5);
}

ctx.font = "24px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("⊕", XOR_X, XOR_Y);
iv(ctx);
arrow(ctx, START_X + BOX_WIDTH * N_OF_REG, START_Y + BOX_HEIGHT / 2, START_X + BOX_WIDTH * N_OF_REG + 50, START_Y + BOX_HEIGHT / 2);
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

function drawRegisters(registers) {
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < N_OF_REG; i++) {
        ctx.fillText(registers[N_OF_REG - i - 1], START_X + BOX_WIDTH * (i + 1/2), START_Y + BOX_HEIGHT / 2);
    }
    ctx.stroke();
}

function drawIv(iv) {
   ctx.font = "18px Arial";
   ctx.textAlign = "center";
   ctx.textBaseline = "middle";
   ctx.fillText(iv, XOR_X, XOR_Y + 25);
   ctx.stroke();
}

init();
drawRegisters("10011");
drawIv("1");

