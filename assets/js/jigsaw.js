var color = [255, 0, 0, 255]

$(document).ready(function () {
    var squareTiling = $("#squareTiling");
    setupSquareTiling(squareTiling, 5, 5);
    
    var squareTilingPicker = $("#squareTilingPicker");
    setupPicker(squareTilingPicker);

    squareTiling.click(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        paintBucket(color, mouseX, mouseY, this);
    });
    
    squareTilingPicker.click(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        var ctx = this.getContext("2d");
        color = ctx.getImageData(mouseX, mouseY, 1, 1).data;
        console.log(color);
    });
});


function setupPicker(domElement) {
    var ctx = domElement[0].getContext("2d");
    var h = domElement[0].height;
    var w = domElement[0].width;
    var grad = ctx.createLinearGradient(0, 0, w, h);
    
    var colors = ["white", "red", "orange", "green", "blue", "purple", "black"];
    for (var i = 0; i < colors.length; i++) {
        grad.addColorStop(i / colors.length, colors[i]);
    }
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
}

function setupSquareTiling(domElement, nRows, nCols) {
    var h = domElement[0].height;
    var w = domElement[0].width;
    var ctx = domElement[0].getContext("2d");

    ctx.beginPath();
    for (var i = 0; i < nRows; i++) {
        ctx.moveTo(0, h * i / nRows);
        ctx.lineTo(w, h * i / nRows);
    }

    for (var j = 0; j < nCols; j++) {
        ctx.moveTo(w * j / nCols, 0);
        ctx.lineTo(w * j / nCols, h);
    }
    ctx.stroke();
}

function paintBucket(col, x, y, domElement) {
    // Based on http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
    var h = domElement.height;
    var w = domElement.width;
    var ctx = domElement.getContext("2d");
    var stack = [[x, y]];

    var imageData = ctx.getImageData(0, 0, w, h);
    var baseColor = imageData.data.slice((y * w + x) * 4, (y * w + x + 1) * 4);

    while (stack.length > 0) {
        var next = stack.pop();
        x = next[0];
        y = next[1];
        // Up loop
        while (y-- >= 0 && colorMatch(baseColor, x, y, w, h, imageData)) {
            continue;
        }

        // Down loop
        var leftChecked = false;
        var rightChecked = false;
        while (y++ < h && colorMatch(baseColor, x, y, w, h, imageData)) {
            colorPixel(col, x, y, w, h, imageData);

            // Check left pixel
            if (x > 0) {
                if (colorMatch(baseColor, x - 1, y, w, h, imageData) && !leftChecked) {
                    stack.push([x - 1, y]);
                    leftChecked = true;
                } else if (leftChecked) {
                    leftChecked = false;
                }
            }
            
            // Check right pixel
            if (x < w - 1) {
                if (colorMatch(baseColor, x + 1, y, w, h, imageData) && !rightChecked) {
                    stack.push([x + 1, y]);
                    rightChecked = true;
                } else if (rightChecked) {
                    rightChecked = false;
                }
            }
        }
    }
    ctx.clearRect(0, 0, w, h);
    ctx.putImageData(imageData, 0, 0);
}

function colorPixel(col, x, y, w, h, imageData) {
    var index = (y * w + x) * 4;
    for (var i = 0; i < 4; i++) {
        imageData.data[index + i] = col[i];
    }
}

function colorMatch(col, x, y, w, h, imageData) {
    var pixelData = imageData.data.slice((y * w + x) * 4, (y * w + x + 1) * 4);
    for (var i = 0; i < 4; i++) {
        if (pixelData[i] != col[i]) return false;
    }
    return true;
}
