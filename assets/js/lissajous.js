let inpFreq1;
let inpFreq2;
let inpPhi;
let isPlaying = true;
let t = 0;
let omega1 = NaN;
let omega2 = NaN;
let phi = NaN;
let speed = NaN;

function setup() {
    createCanvas(720, 400);
    noStroke();

    textFreq1 = createP('Input \\(\\omega_1\\)');
    textFreq1.style('font-size: 20px; color: white;');
    textFreq1.position(10, 0);
    inpFreq1 = createInput('2', 'number');
    inpFreq1.style('width: 100px');
    inpFreq1.position(10, 50);


    textFreq2 = createP('Input \\(\\omega_2\\)');
    textFreq2.style('font-size: 20px; color: white;');
    textFreq2.position(10, 75);
    inpFreq2 = createInput('3', 'number');
    inpFreq2.style('width: 100px');
    inpFreq2.position(10, 125);


    textPhi = createP('Input \\(\\varphi\\)');
    textPhi.style('font-size: 20px; color: white;');
    textPhi.position(10, 150);
    inpPhi = createInput('3.14', 'number');
    inpPhi.style('width: 100px');
    inpPhi.position(10, 200);

    textSpeed = createP('Input speed');
    textSpeed.style('font-size: 20px; color: white; transform: rotate(270deg);');
    textSpeed.position(625, 75);
    sliderSpeed = createSlider(0, 10, 5, 0.1);
    sliderSpeed.style('width: 200px; transform: rotate(270deg);');
    sliderSpeed.position(600, 100);
    
    MathJax.typeset();
}

function draw() {
    if (omega1 != inpFreq1.value() || omega2 != inpFreq2.value() || phi != inpPhi.value()) {
        omega1 = float(inpFreq1.value());
        omega2 = float(inpFreq2.value());
        phi = float(inpPhi.value());
        clear();
    }

    background(0, 10);

    speed = sliderSpeed.value() * omega2 * omega1;
    translate(width / 2, height / 2);
    for (var i = 0; i < int(speed); i++) {
        fill(255);
        ellipse(100 * sin(omega1 * t + phi), 100 * sin(omega2 * t), 5, 5);

        t += 0.02 / (omega1 * omega2);
    }
}

function mousePressed() {
    if (mouseX >= 150 && mouseX <= 600 && mouseY >= 0 && mouseY <= height) {
        if (isPlaying) {
            isPlaying = false;
            noLoop();
        } else {
            isPlaying = true;
            loop();
        }
    }
}
