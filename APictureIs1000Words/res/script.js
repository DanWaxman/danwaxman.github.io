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
        cv.copyMakeBorder(src, src, 0, (7 - (src.rows % 7)), 0, (3 - (src.cols % 3)), cv.BORDER_CONSTANT);

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
    // Incredilby inefficient while testing...
    // Fix that later.

    // One current problem is that when everything is so zoomed in, a diagonal
    // looks just like a straight vertial line. I need to pad and then convolve around 
    // a larger context to fix this, but I also need sleep so...
    if (openCVLoaded) {
        let col  = cv.matFromArray(3, 3, cv.CV_8U, [1,0,-1,2,0,-2,1,0,-1]);
        let row = cv.matFromArray(3, 3, cv.CV_8U, [1,2,1,0,0,0,-1,-2,-1]);
        let mDiag = cv.matFromArray(3,3, cv.CV_8U, [0,1,2,-1,0,1,-2,-1,0]);
        let sDiag = cv.matFromArray(3, 3, cv.CV_8U, [-2,-1,0,-1,0,1,0,1,2]);


        let tmpCol = cv.Mat.zeros(1, 5, cv.CV_8U);
        let tmpRow = cv.Mat.zeros(1, 5, cv.CV_8U);
        let tmpmDiag = cv.Mat.zeros(1, 5, cv.CV_8U);
        let tmpsDiag = cv.Mat.zeros(1, 5, cv.CV_8U);


        let colConv = cv.filter2D(img, tmpCol, cv.CV_8U, col);
        let rowConv = cv.filter2D(img, tmpRow, cv.CV_8U, row);
        let mDiagConv = cv.filter2D(img, tmpmDiag, cv.CV_8U, mDiag);
        let sDiagConv = cv.filter2D(img, tmpsDiag, cv.CV_8U, sDiag);


        let colSum = 0;
        let rowSum = 0;
        let mDiagSum = 0;
        let sDiagSum = 0;

        for (var i = 0; i < 1 * 5; i++) {
            colSum += Math.abs(tmpCol.data[i]);
            rowSum += Math.abs(tmpRow.data[i]);
            mDiagSum += Math.abs(tmpmDiag.data[i]);
            sDiagSum += Math.abs(tmpsDiag.data[i]);
        }

        tmpCol.delete(); tmpRow.delete(); tmpmDiag.delete(); tmpsDiag.delete();

        mVal = Math.max(colSum, rowSum, mDiagSum, sDiagSum);
        if (mVal == 0) {
            return ' ';
        }
        if (colSum == mVal) {
            return '|';
        } else if (rowSum == mVal) {
            return '-';
        } else if (mDiagSum == mVal) {
            return '\\';
        } else {
            return '/';
        }
    }
    return ' ';
}