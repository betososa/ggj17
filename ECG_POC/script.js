var lastData = 0;

// Create a random function that is dependent on the last value
function hysteresisRandom(){
  lastData += (Math.floor((Math.random() * 5) + 1)-3)/50;
  if (Math.abs(lastData) >= 1)
    lastData = (lastData > 0) ? 1 : -1;

  return lastData;
}

// --------------------------- ECG Demo

var ECG_data = [0, 0.10, 0.16, 0.10, 0, 0, 0, -0.04, -0.08, 0.3, 0.9, 0.3, -0.17, 0, 0, 0, 0, 0, 0.10, 0.14, 0.16, 0.08, 0];
var ECG_idx = 0;

function getECG(){
  if (ECG_idx++ >= ECG_data.length - 1)
    ECG_idx = 0;
  
  var output = new Array();
  output[0] = ECG_data[ECG_idx] + hysteresisRandom()/10;
  
  return output;
}

var ecg;

$(document).ready(function(){
  ecg = new PlethGraph("ecg", getECG);
  ecg.color = "#FF0000";

  ecg.start();
});