function Meter(canvas, startInterval, goodStrokeHandler, badStrokeHandler) {
    this._ctx = canvas.getContext('2d');
    this._timer = null;
    this._angle = 180;
    this._successfulHits = 0;
    this._goodStrokeHandler = goodStrokeHandler;
    this._badStrokeHandler = badStrokeHandler;
    this._interval = startInterval || 500;

    var lengthNeedle = canvas.width > canvas.height ? canvas.height - canvas.height * .1 : canvas.width - canvas.width * .1;

    this._needle = new Needle(this._ctx, canvas.width / 2, canvas.height - 20, lengthNeedle);
}

Meter.prototype.draw = function(angle) {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    this._needle.draw(this._ctx, angle);
    this._angle = angle;
}

Meter.prototype.startMeter = function() {
    var that = this;
    this._timer = setInterval(function() { 
        var angle = Math.floor((Math.random() * 180) + 0);
        that.draw(angle);
    }, this._interval);
    $(window).on('keypress', function (e) {
        if (e.which === 32) {
            if (that._angle >= 67 && that._angle <= 113) {
                that.goodStroke();
            } else {
                that.badStroke();
            }
        }
    });
}

Meter.prototype.stopMeter = function() {
    clearInterval(this._timer);
    $(window).off('keypress');
}

Meter.prototype.goodStroke = function () {
    this._successfulHits++;
    if (this._successfulHits >= 1 && this._interval >= 50) {
        console.log(this._successfulHits);
        console.log(this._interval);
        this.stopMeter();
        this._interval -= this._interval * .1;
        this.startMeter();
        this._successfulHits = 0;
    }
    if (this._goodStrokeHandler) {
        this._goodStrokeHandler();
    }
    console.log('Fine stroke');
}

Meter.prototype.badStroke = function () {
    if (this._badStrokeHandler) {
        this._badStrokeHandler();
    }
    console.log('Bad stroke');
}