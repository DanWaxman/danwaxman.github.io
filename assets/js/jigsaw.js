$(document).ready(function() {
    var squareTiling = $("#squareTiling");
    setupSquareTiling(squareTiling, 20, 20);
});

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
