var x = [];
var y = [];
var basetime = 100;
var pauseIndex = 0;
var pause = false;

function init() {
document.getElementById('pause-button').onclick = function() {
		pause = true;
  };
  
  document.getElementById('play-button').onclick = function() {
		if (pause) {
    	pause = false;
    	draw(pauseIndex);
    }
  };

  document.getElementById('initiator').onclick = function() {
  pause = false;
  	var x_t = document.getElementById('xval').value.split(',');
    var y_t = document.getElementById('yval').value.split(',');
    x = []
    y = []
 for (i = 0; i < x_t.length; i++) {
    x[i] = parseFloat(x_t[i]);
    y[i] = parseFloat(y_t[i]);
  }
    draw(0);
  };
}

function slider() {
	return (1000 - document.getElementById('speed').value) / 500 ;
}

function draw(i) {
	if (pause) {
  	pauseIndex = i;
    return;
  }
  
 
  var ctx = document.getElementById('canvas').getContext('2d');

 if (i == 0) {
  ctx.clearRect(0, 0, 1000, 500);
  ctx.beginPath();
  }

  if (i < x.length - 1) {
    setTimeout(function() {
      ctx.moveTo(1000.0 / 54.0 * x[i], 500 - (500.0 / 27.0 * y[i]));
      ctx.lineTo(1000.0 / 54.0 * x[i + 1], 500 - (500.0 / 27.0 * y[i + 1]));

      ctx.stroke()
      draw(i + 1);
    }, basetime * slider());
  }
}

init();

