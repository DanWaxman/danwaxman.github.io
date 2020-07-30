var x = new Array();
var y = new Array();
var basetime = 100;
var pauseIndex = 0;
var pause = false;

function handleFileSelect(evt) {
  var files = evt.target.files;

  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();
    reader.readAsText(f);

    reader.onload = function(e) {
      if (e.target.readyState == FileReader.DONE) {
        parseCSV(e.target.result);
      }
    };
  }
}

function parseCSV(csv_input) {
  var rows = csv_input.split("\n");
  var x_temp = new Array();
  var y_temp = new Array();
  for (j = 1; j < rows.length; j++) {
    var row_values = rows[j].split(",");
    x_temp.push(row_values[0]);
    y_temp.push(row_values[1]);
  }
  x.push(x_temp);
  y.push(y_temp);
}

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

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  document.getElementById('initiator').onclick = function() {
    pause = false;
    draw(0);
  };
}

function slider() {
  return (1000 - document.getElementById('speed').value) / 500;
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
  if (i < x[0].length - 1) {
    setTimeout(function() {
      for (j = 0; j < x.length; j++) {
        ctx.moveTo(1000.0 / 54.0 * x[j][i], 500 - (500.0 / 27.0 * y[j][i]));
        ctx.lineTo(1000.0 / 54.0 * x[j][i + 1], 500 - (500.0 / 27.0 * y[j][i + 1]));
      }

      ctx.stroke();
      draw(i + 1);
    }, basetime * slider());
  }
}

init();
