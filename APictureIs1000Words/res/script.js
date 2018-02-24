function init() {
    var canvas = document.getElementById('color-image');

    var img = new Image;
    img.src = 'res/coloredpencils.jpg'
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        color2bw(canvas);
    }

}

function color2bw(imgCanvas) {
    var ctx = imgCanvas.getContext('2d');
    var pixelData = ctx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
    var data = pixelData.data;

    for (var i = 0; i < data.length; i += 4) {
        var lum = 0.21 * data[i] + 0.72 * data[i + 1] + 0.07 * data[i + 2];
        data[i] = lum;
        data[i + 1] = lum;
        data[i + 2] = lum;
    }

    ctx.putImageData(pixelData, 0, 0);
}

window.onload = init();