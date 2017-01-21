var a;

$(document).ready(function() {
  a = new ECG('ecg');
  a.init();

  $('#btnIncreaseSpeed').click(function() {
    if (a.getSpeed() != 1) {
      a.increaseSpeed();
      console.log(a.getSpeed());
    } else {
      alert('You lost! :\'(');
    }
  });
});