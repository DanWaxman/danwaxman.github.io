$( document ).ready(function() {
    // Load OpenCV Library
    $.getScript( '/APictureIs1000Words/res/opencv.js', function( data, textStatus, jqxhr ) {
        console.log( 'OpenCV.js load was performed | Status: ' + textStatus + ' ' + jqxhr.status);
        openCVLoaded = true;
    });

    // Set the input image to an uploaded one when the upload changes
    $( '#fileInput' ).on( 'change', function(e) {
        $( '#imageSrc' ).attr('src', URL.createObjectURL(e.target.files[0]));
    });

    // After the input image changes, do some image manipulation
    $( '#imageSrc').on( 'load', function() {
        let src = cv.imread('imageSrc');
        let dst = new cv.Mat();
        cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
        // Courier New has an aspact ratio of ~0.43
        // This makes an approximation of 14px x 3px pretty good for one char
        cv.copyMakeBorder(src, src, 0, (7 - (src.rows % 7)), 0, (3 - (src.cols % 3)), cv.BORDER_REPLICATE);

        cv.Canny(src, dst, 50, 100, 3, false);

        var charStr = ''
        for (var i = 0; i < dst.rows; i += 7) {
            for (var j = 0; j < dst.cols; j += 3) {
                let roiRect = new cv.Rect(j, i, 3, 7);
                let tempImg = dst.roi(roiRect);
                charStr += calculateLines(tempImg);
                tempImg.delete();
            }
            charStr += '<br>';
        }
        cv.imshow('canvasOutput', dst);

        $('#charoutput').html(charStr);


        src.delete(); dst.delete();
    });
});

var openCVLoaded = false;

function calculateLines(img) {
    let sum = 0;
    if (openCVLoaded) {
        let lines = new cv.Mat();

        cv.HoughLinesP(img, lines, 1, Math.PI / 180, 2, 0, 0);
        if (lines.rows) {
            return '|';
        }

    }
    return ' ';
}
