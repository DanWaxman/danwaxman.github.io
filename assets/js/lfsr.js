var c = document.getElementById("lfsr");
var ctx = c.getContext("2d");
const BOX_WIDTH = 30;
const BOX_HEIGHT = 30;
const N_OF_REG = 5;
const START_X = 50;
const START_Y = 0;
const XOR_X = START_X + BOX_WIDTH * N_OF_REG / 2;
const XOR_Y = 105;
var ci = [1, 0, 0, 0, 1];

var registers = "10011";
var iv_val = "1";

function i() {
    document.getElementById("start").onclick = startAnimation;
}

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

function drawRegisters(registers, dx = 0, dy = 0, spacing = BOX_WIDTH) {
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < registers.length; i++) {
        ctx.fillText(registers[i], START_X + BOX_WIDTH /2 + spacing * i + dx, START_Y + BOX_HEIGHT / 2 + dy);
    }
    ctx.stroke();
}

function drawOutput(op) {
    /*ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (var i = 0; i < op.length; i++) {
        ctx.fillText(op[i], BOX_WIDTH + (i + 1/2), 175);
    }
    ctx.stroke();
    */
    drawRegisters(op, -START_X, 150, BOX_WIDTH / 2);
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
var output = "";
var current_out = "";

const anim_dt = 20;
const anim_dz = 2;

function draw() {
    if (STAGE == 0) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_x = XOR_X;
        iv_y = XOR_Y;
        rdx = 0;
        drawIv(iv_val);
        STAGE = 1;
    } else if (STAGE == 1) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_x -= anim_dz;
        drawIv(iv_val, iv_x, iv_y);
        if (iv_x < 20) {
            iv_x = 15;
            STAGE = 2;
        }
    } else if (STAGE == 2) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_y -= anim_dz;
        if (iv_y < START_Y + BOX_HEIGHT / 2) {
            iv_y = START_Y + BOX_HEIGHT / 2;
            STAGE = 3;
        }
        drawIv(iv_val, iv_x, iv_y);
    } else if (STAGE == 3) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_x += anim_dz;
        if (iv_x > START_X - BOX_WIDTH / 2) {
            iv_x = START_X - BOX_WIDTH / 2;
            STAGE = 4;
            registers = iv_val + registers;
        }
        drawIv(iv_val, iv_x, iv_y);
    } else if (STAGE == 4) {
        init();
        drawOutput(output);
        rdx += anim_dz;
        if (rdx > BOX_WIDTH) {
            rdx = BOX_WIDTH;
            STAGE = 5;
            current_out = registers.charAt(registers.length - 1);
            registers = registers.slice(0, registers.length - 1);
            iv_x = START_X + BOX_WIDTH * (N_OF_REG + 1/2);
            iv_y = START_Y + BOX_HEIGHT / 2;
            drawIv(current_out, iv_x, iv_y);
            rdx = 0;
        }
        drawRegisters(registers, -BOX_WIDTH + rdx);
    } else if (STAGE == 5) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_x += anim_dz;
        if (iv_x > START_X + BOX_WIDTH * N_OF_REG + 50) {
            iv_x = START_X + BOX_WIDTH * N_OF_REG + 50;
            STAGE = 6;
        }
        drawIv(current_out, iv_x, iv_y);
    } else if (STAGE == 6) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_y += anim_dz;

        if (iv_y > 150 + BOX_HEIGHT / 2) {
            iv_y = 150 + BOX_HEIGHT / 2;
            STAGE = 7;
        }
        drawIv(current_out, iv_x, iv_y);
    } else if (STAGE == 7) {
        init();
        drawRegisters(registers);
        drawOutput(output);
        iv_x -= anim_dz;

        if (iv_x < BOX_WIDTH / 2 * (1 + output.length)) {
            iv_x = BOX_WIDTH / 2 * (1 + output.length);
            output = output + current_out;
            current_out = "";
            STAGE = 8;
        }
        drawIv(current_out, iv_x, iv_y);
    } else if (STAGE == 8) {
        init();
        drawRegisters(registers);
        drawOutput(output);

        var filt_reg = "";
        for (var i = 0; i < registers.length; i++) {
            if (ci[i] == 1) {
                filt_reg += registers[i];
            } else {
                filt_reg += " ";
            }
        }
        var theta = Math.atan2(XOR_X - (START_X + BOX_WIDTH / 2), 100);
        rdx += 1;

        if (rdx > 100) {
            rdx = 100;
            iv_val = xor(filt_reg);
            STAGE = 0;
        }
        var dx = (rdx / 100) * (XOR_X - (BOX_WIDTH / 2 + START_X));
        drawRegisters(filt_reg, dx, rdx, (BOX_WIDTH * N_OF_REG - 2 * dx) / N_OF_REG );//, BOX_WIDTH / (1 + rdx / 25));
        // TODO: MAKE THIS NOT SHIT
        // AND ALSO FOLLOW LINES
    }
}

function xor(r) {
    var sum = 0;
    for (var i = 0; i < r.length; i++) {
        if (r[i] == "1") {
            sum += 1;
        }
    }
    return (sum % 2).toString();
}

function startAnimation() {
    registers = document.getElementById("registers").value;
    ci_input = document.getElementById("taps").value;
    ci = [];
    for (var i = 0; i < ci_input.length; i++) {
        if (ci_input[i] == "1") {
            ci[i] = 1;
        } else if (ci_input[i] == "0") {
            ci[i] = 0;
        }
    }

    console.log(registers);
    console.log(ci);

    iv_val = xor(registers);

    setInterval(draw, anim_dt);
}

i();


