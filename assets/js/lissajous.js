var prevx = 0;
var prevy = 0;
var prevt = 0;
var omega_1 = 1;
var omega_2 = 20;
var phase = Math.PI / 2;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var reqId = null;
var speed = 1;

function init() {
    document.getElementById('play-button').onclick = function() {
        if (reqId) {
            cancelAnimationFrame(reqId);
        }

        omega_1 = parseFloat(document.getElementById('omega_1').value);
        omega_2 = parseFloat(document.getElementById('omega_2').value);
        phase = parseFloat(document.getElementById('phase').value) * Math.PI;
        speed = parseFloat(document.getElementById('speed').value)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        startAnimation();
    }
}

function startAnimation() {
    let t = performance.now() / 1000;
    prevx = getX(omega_1, t, phase);
    prevy = getY(omega_2, t);
    prevt = t;
    reqId = requestAnimationFrame(draw);
}

function draw() {
    ctx.beginPath();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'green';
    ctx.moveTo(prevx, prevy);

    let t = performance.now() / 1000;
    let nsteps = Math.max(omega_1, omega_2) * speed;
    let x = 0;
    let y = 0;
    for (var i = 1; i <= nsteps; i++) {
        let ct = prevt + (t - prevt) * (i / nsteps);
        x = getX(omega_1, ct, phase);
        y = getY(omega_2, ct);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    reqId = requestAnimationFrame(draw);
    prevt = t;
    prevx = x;
    prevy = y;
}

function getX(omega, t, phase) {
    return canvas.width / 2 + 100 * Math.sin(omega * t * speed + phase);
}

function getY(omega, t) {
    return canvas.height / 2 + 100 * Math.sin(omega * t * speed);
}

init();

