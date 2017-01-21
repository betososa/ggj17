function Needle(ctx, cx, cy, length) {
    this._ctx = ctx;
    this._length = length;
    this._cx = cx;
    this._cy = cy;
}

Needle.prototype.draw = function(ctx, angle) {
    var px, py;
    var pEx = this._cx + this._length * Math.cos(angle * Math.PI / 180); 
    var pEy = this._cy - this._length * Math.sin(angle * Math.PI / 180); 

    ctx.beginPath();
    ctx.moveTo(this._cx, this._cy);
    px = this._cx + 10 * Math.cos((angle + 90) * Math.PI / 180); 
    py = this._cy - 10 * Math.sin((angle + 90) * Math.PI / 180); 
    ctx.lineTo(px, py);
    ctx.lineTo(pEx, pEy);
    ctx.closePath();
    ctx.fillStyle="#999999";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this._cx, this._cy);
    px = this._cx + 10 * Math.cos((angle - 90) * Math.PI / 180); 
    py = this._cy - 10 * Math.sin((angle - 90) * Math.PI / 180); 
    ctx.lineTo(px, py);
    ctx.lineTo(pEx, pEy);
    ctx.closePath();
    ctx.fillStyle="#000000";
    ctx.fill();
    ctx.stroke();
}