(function () {
    var meter = null;
    ecg = null;
    var randomName = [
        "Chuck Norris",
        "James Bond",
        "Princess Leia",
        "Katniss Everdeen",
        "Yoda"
    ];
    var timer;
    var mySwiper;

    $(function () {
        $('#credits').click(function() {
            crate.init({
                setTitle: 'Globant Mx',
                setBody: '<img id="splash" src="../img/ggjSplash.jpg" />',
                closeActions: {
                    button: true,
                    clickIn: true,
                    clickOut: true
                }
            })
        });

        mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            effect: 'fade',
            speed: 1000,
            loop: false,
            keyboardControl: true,
            onSlideChangeEnd: function(e) {
                if (e.activeIndex === 3) {
                    if (!ecg) {
                        var name = $('#userName').val() || 
                            randomName[Math.floor(Math.random() * randomName.length)];
                        $('#user').text(name);
                        window.ecg = new ECG('ecg');
                        ecg.init();
                        var canvas = $('#meter')[0];
                        meter = new Meter(canvas, 20, undefined, badStroke);
                        meter.startMeter();
                    };
                }
            }
        });

        $('#playIt').on('click', function () {
            mySwiper.slideTo(3);
        });

        timer = setInterval(function (){
            if (mySwiper.activeIndex !== 2) {
                mySwiper.slideNext(true);
            } else {
                clearInterval(timer);
            }
        }, 5000);
    });

    function badStroke() {
        ecg.increaseSpeed();
    }
})();
