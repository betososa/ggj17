(function () {
    var meter = null;
    var ecg = null;

    $(function () {
        ecg = new ECG('ecg');
        ecg.init();
        var canvas = $('#meter')[0];
        meter = new Meter(canvas, 500, undefined, badStroke);
        meter.startMeter();
    });

    function badStroke() {
        ecg.increaseSpeed();
    }
})();