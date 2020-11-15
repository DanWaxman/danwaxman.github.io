var color = [255, 0, 0, 255];
var colors = ["#f56c42", "#fcda42", "#88f23d", "#2b8c6a", "#3dd5e3", "#8654e3", "#e02b46"];
var colorsArrays = [[245, 108, 66, 255], [252, 218, 66, 255], [136, 242, 61, 255], [43, 140, 106, 255], [61, 213, 227, 255], [134, 84, 227, 255], [224, 43, 70, 255]];
var sin60 = Math.sin(Math.PI / 3);

$(document).ready(function () {
    var squareTiling = $("#squareTiling");
    setupSquareTiling(squareTiling, 20, 20, 4, 4);

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
    });

    var triangleTiling = $("#triangleTiling");
    setupTriangleTiling(triangleTiling, 6, 6, 3, 3);

    var triangleTilingPicker = $("#triangleTilingPicker");
    setupPicker(triangleTilingPicker);

    triangleTiling.click(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        paintBucket(color, mouseX, mouseY, this);
    });

    triangleTilingPicker.click(function (e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        var ctx = this.getContext("2d");
        color = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    });
});

function setupTriangleTiling(domElement, nRows, nCols, sizeX, sizeY) {
    var h = domElement[0].height;
    var w = domElement[0].width;
    var ctx = domElement[0].getContext("2d");

    ctx.beginPath();
    for (var i = 0; i < nRows; i++) {
        ctx.moveTo(0, h * i / nRows);
        ctx.lineTo(w, h * i / nRows);
        
        ctx.moveTo(0, h * (i+0.5) / nRows);
        ctx.lineTo(w, h * (i+0.5) / nRows);

        ctx.moveTo(0, h * i / nRows);
        ctx.lineTo(w/2, h * i / nRows + w * sin60);
        
        ctx.moveTo(0, h * i / nRows);
        ctx.lineTo(w/2, h * i / nRows - w * sin60);
        
        ctx.moveTo(w, h * i / nRows);
        ctx.lineTo(w/2, h * i / nRows + w * sin60);
    }

    for (var j = 0; j < nCols; j++) {
        ctx.moveTo(w * j / nCols, 0);
        ctx.lineTo(w * j / nCols + w/2, w * sin60);
        
        ctx.moveTo(w * (j+0.5) / nCols, 0);
        ctx.lineTo(w * (j+0.5) / nCols + w/2, w * sin60);
        
        ctx.moveTo(w * j / nCols, 0);
        ctx.lineTo(w * j / nCols - w/2, w * sin60);
        
        ctx.moveTo(w * (j+0.5) / nCols, 0);
        ctx.lineTo(w * (j+0.5) / nCols - w/2, w * sin60);
    }
    
    ctx.stroke();

    /*

    /*var rowIndex = 0;
    var colIndex = 0;
    for (var row = 0; row < nRows; row++) {
        rowIndex = Math.floor(row / sizeY) * 2;
        for (var column = 0; column < nCols; column++) {
            colIndex = Math.floor(column / sizeX);
            
            var x = h * (column + 0.5) / nCols;
            var y = w * (row + 0.5) / nRows;
            
            color = colorsArrays[(rowIndex + colIndex) % colors.length];
            paintBucket(color, Math.floor(x), Math.floor(y), domElement[0]);
        }
    }*/
}


function setupPicker(domElement) {
    var ctx = domElement[0].getContext("2d");
    var h = domElement[0].height;
    var w = domElement[0].width;

    for (var i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(0, i * h / colors.length, w, h / colors.length);
    }
}

function setupSquareTiling(domElement, nRows, nCols, sizeX, sizeY) {
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

    var rowIndex = 0;
    var colIndex = 0;
    for (var row = 0; row < nRows; row++) {
        rowIndex = Math.floor(row / sizeY) * 2;
        for (var column = 0; column < nCols; column++) {
            colIndex = Math.floor(column / sizeX);

            var x = h * (column + 0.5) / nCols;
            var y = w * (row + 0.5) / nRows;

            color = colorsArrays[(rowIndex + colIndex) % colors.length];
            paintBucket(color, Math.floor(x), Math.floor(y), domElement[0]);
        }
    }
}

function paintBucket(col, x, y, domElement) {
    // Based on http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
    var h = domElement.height;
    var w = domElement.width;
    var ctx = domElement.getContext("2d");
    var stack = [[x, y]];

    var imageData = ctx.getImageData(0, 0, w, h);
    var baseColor = imageData.data.slice((y * w + x) * 4, (y * w + x + 1) * 4);

    var sameColors = true;
    for (var i = 0; i < 4; i++) {
        sameColors &= (col[i] == baseColor[i]);
    }
    if (sameColors) {
        return true;
    }

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
