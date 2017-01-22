function ECG(canvasId) {
  var g = this;
  var ecg;
  
  var ECG_DATA_ALIVE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.10, 0.16, 0.10, 0, 0, 0, -0.04, -0.08, 0.3, 0.9, 0.3, -0.25, 0, 0, 0, 0, 0, 0.12, 0.16, 0.18, 0.2, 0.08, 0];
  var ECG_data = ECG_DATA_ALIVE;
  var ECG_idx = 0;

  ECG_COLOR_GREEN = "#0d910d";
  ECG_COLOR_YELLOW = "#e8dc00";
  ECG_COLOR_RED = "#a50909";
  
  var lastData = 0;

  // Create a random function that is dependent on the last value
  function hysteresisRandom(){
    lastData += (Math.floor((Math.random() * 5) + 1)-3)/50;
    if (Math.abs(lastData) >= 1)
      lastData = (lastData > 0) ? 1 : -1;

    return lastData;
  }

  g.getECG = function(){
    if (ECG_idx++ >= ECG_data.length - 1)
      ECG_idx = 0;
    
    var output = new Array();
    output[0] = ECG_data[ECG_idx] + hysteresisRandom()/10;
    
    return output;
  }

  g.changeColor = function(hexColor) {
    ecg.color = hexColor;
  }

  start = function() {
    ecg.start();
  }

  g.init = function() {
    ecg = new PlethGraph(canvasId, g.getECG);
    g.changeColor(ECG_COLOR_GREEN);
    ecg.start();
  }

  g.increaseSpeed = function() {
    if (ECG_data[0] == 0) {
      for (var i = 5; i >= 1; i--) {
        ECG_data.shift(0);
      }
    }
    checkColor();
  }

  g.getSpeed = function() {
    var i = 0;
    var item = 0;
    var output = 0;
    
    while (item == 0) {
      item = ECG_data[i];
      output++;
      i++;
    }
    
    return output;
  }

  function restartEcg() {
    ecg.stop();
    ecg = new PlethGraph(canvasId, g.getECG);
    ecg.start();
  }

  g.restart = function() {
    ECG_data = ECG_DATA_ALIVE;
    restartEcg();
  }

  function checkColor() {
    if (g.getSpeed() <= 30 && g.getSpeed() > 15) {
      g.changeColor(ECG_COLOR_YELLOW);
    } else if (g.getSpeed() <= 15) {
      g.changeColor(ECG_COLOR_RED);
    }

    if (g.getSpeed() < 5) {
      ECG_data = [0];
      restartEcg();
    };
  }
}