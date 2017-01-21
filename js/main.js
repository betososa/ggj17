(function () {
    var meter = null;

    $(function () {
        var canvas = $('#meter')[0];
        meter = new Meter(canvas);

        meter.startMeter();
    });
})();