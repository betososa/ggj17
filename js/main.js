(function () {
    $(function () {
        var canvas = $('#scenario')[0];
        var ctx = canvas.getContext('2d');

        ctx.font = '30px Arial';
        ctx.fillText('Hello world', 10, 30);
    });
})();