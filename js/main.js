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
                if (e.activeIndex === 4) {
                    if (!ecg) {
                        var name = $('#userName').val() || 
                            randomName[Math.floor(Math.random() * randomName.length)];
                        $('#user').text(name);
                        window.ecg = new ECG('ecg');
                        ecg.init();
                        var canvas = $('#meter')[0];
                        meter = new Meter(canvas, 20, undefined, badStroke);
                        meter.startMeter();
                        var audioBeat = document.createElement('audio');
                        audioBeat.setAttribute('loop', true);
                        audioBeat.setAttribute('src', '../sounds/beat.mp3');
                        audioBeat.setAttribute('id', 'beat');
                        audioBeat.autoplay = true;
                        var audioTorture = document.createElement('audio');
                        audioTorture.setAttribute('id', 'death');
                        audioTorture.setAttribute('src', '../sounds/torture.mp3');
                        var audioScream = document.createElement('audio');
                        audioScream.setAttribute('id', 'pain');
                        audioScream.setAttribute('src', '../sounds/pain.mp3');
                        document.body.appendChild(audioScream);
                        document.body.appendChild(audioTorture);
                        document.body.appendChild(audioBeat);
                    };
                }
            }
        });

        $('#playIt').on('click', function () {
            mySwiper.slideTo(4);
        });

        timer = setInterval(function (){
            if (mySwiper.activeIndex !== 3) {
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
