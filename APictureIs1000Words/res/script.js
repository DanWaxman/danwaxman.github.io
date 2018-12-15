$( document ).ready(function() {
    // Load OpenCV Library
    $.getScript( '/res/opencv.js', function( data, textStatus, jqxhr ) {
        console.log( 'OpenCV.js load was performed | Status: ' + textStatus + ' ' + jqxhr.status);
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

        cv.Canny(src, dst, 50, 100, 3, false);
        cv.imshow('canvasOutput', dst);
        src.delete(); dst.delete();
    });
});