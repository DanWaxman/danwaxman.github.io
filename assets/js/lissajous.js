var prevx = 0;
var prevy = 0;
var omega_1 = 1;
var omega_2 = 20;
var phase = Math.PI / 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var reqId = null;

function init() {
    document.getElementById('play-button').onclick = function() {
        if (reqId) {
            cancelAnimationFrame(reqId);
        }

        omega_1 = parseFloat(document.getElementById("omega_1").value);
        omega_2 = parseFloat(document.getElementById("omega_2").value);
        phase = parseFloat(document.getElementById("phase").value) * Math.PI;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        startAnimation();
    }
}

function startAnimation() {
    let t = new Date() / 1000;
    prevx = getX(omega_1, t, phase);
    prevy = getY(omega_2, t);
    reqId = requestAnimationFrame(draw);
}

function draw() {
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'green';
    ctx.moveTo(prevx, prevy);

    let t = new Date() / 1000;
    let x = getX(omega_1, t, phase);
    let y = getY(omega_2, t);
    ctx.lineTo(x, y);
    ctx.stroke();
    prevt = t;
    reqId = requestAnimationFrame(draw);
    prevx = x;
    prevy = y;
}

function getX(omega, t, phase) {
    return canvas.width / 2 + 100 * Math.sin(omega * t + phase);
}

function getY(omega, t) {
    return canvas.height / 2 + 100 * Math.sin(omega * t);
}

init();

