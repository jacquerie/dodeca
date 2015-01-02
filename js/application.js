$(document).ready(function() {
    lastEventX = null;
    lastEventY = null;
    velocityX = 0;
    velocityY = 0;
    FRICTION = 0.96;
    MIN_VELOCITY = 0.5;
    MS_BTW_UPD = 18;
    
    init();
});


var init = function() {
    attachEvents();
    draw();
};


var attachEvents = function() {
    $(document).mousemove(function(e) {

        if (lastEventX !== null) {
            var velocityX = (e.clientX - lastEventX) * (MS_BTW_UPD / 1000);
            var velocityY = (e.clientY - lastEventY) * (MS_BTW_UPD / 1000);
            var maxVelocity = velocityX;

            if (Math.abs(velocityX) < Math.abs(velocityY)) {
                maxVelocity = velocityY;
            }

            window.velocityX += velocityX;
            window.velocityY += velocityY;
        }

        lastEventX = e.clientX;
        lastEventY = e.clientY;
    });
    
    $('.pentagon').click(cycleColor);
};


var cycleColor = function() {
    $this = $(this);
    
    if ($this.hasClass('red')) {
        $this.removeClass('red').addClass('blue');
    } else if ($this.hasClass('blue')) {
        $this.removeClass('blue').addClass('orange');
    } else if ($this.hasClass('orange')) {
        $this.removeClass('orange').addClass('green');
    } else if ($this.hasClass('green')) {
        $this.removeClass('green').addClass('red');
    }
    
    if(checkColoring()) {
        alert("Congratulations! You solved this puzzle. Please email me at jacopo.notarstefano [at] gmail.com");
    }
};


var checkColoring = function() {
    var colors = [
        $('#face-01').attr('class').split(' ')[1],
        $('#face-02').attr('class').split(' ')[1],
        $('#face-03').attr('class').split(' ')[1],
        $('#face-04').attr('class').split(' ')[1],
        $('#face-05').attr('class').split(' ')[1],
        $('#face-06').attr('class').split(' ')[1],
        $('#face-07').attr('class').split(' ')[1],
        $('#face-08').attr('class').split(' ')[1],
        $('#face-09').attr('class').split(' ')[1],
        $('#face-10').attr('class').split(' ')[1],
        $('#face-11').attr('class').split(' ')[1],
        $('#face-12').attr('class').split(' ')[1],
    ];

    if (colors[1] === colors[0] ||
        colors[1] === colors[2] ||
        colors[1] === colors[4] ||
        colors[1] === colors[5] ||
        colors[1] === colors[10]) {
            return false;
    }

    if (colors[4] === colors[0] ||
        colors[4] === colors[5] ||
        colors[4] === colors[6] ||
        colors[4] === colors[7]) {
            return false;
    }

    if (colors[6] === colors[0] ||
        colors[6] === colors[7] ||
        colors[6] === colors[8] ||
        colors[6] === colors[9]) {
            return false;
    }

    if (colors[8] === colors[0] ||
        colors[8] === colors[9] ||
        colors[8] === colors[10] ||
        colors[8] === colors[11]) {
            return false;
    }

    if (colors[10] === colors[0] ||
        colors[10] === colors[2] ||
        colors[10] === colors[11]) {
            return false;
    }

    if (colors[2] === colors[3] ||
        colors[2] === colors[5] ||
        colors[2] === colors[11]) {
            return false;
    }

    if (colors[5] === colors[3] ||
        colors[5] === colors[7]) {
            return false;
    }

    if (colors[7] === colors[3] ||
        colors[7] === colors[9]) {
            return false;
    }

    if (colors[9] === colors[3] ||
        colors[9] === colors[11]) {
            return false;
    }

    if (colors[11] === colors[3]) {
            return false;
    }

    return true;
};


var draw = function() {

    var dodecahedron = $('#dodecahedron');

    if (dodecahedron.data('angleX') == null) {
        dodecahedron.data('angleX', 0);
        dodecahedron.data('angleY', 0);
    }

    var angleX = dodecahedron.data('angleX');
    var angleY = dodecahedron.data('angleY');

    angleX = (angleX + velocityX) % 360;
    dodecahedron.data('angleX', angleX);
    velocityX *= FRICTION;
    if (Math.abs(velocityX) < MIN_VELOCITY) {
        velocityX = 0;
    }

    angleY = (angleY + velocityY) % 360;
    dodecahedron.data('angleY', angleY);
    velocityY *= FRICTION;
    if (Math.abs(velocityY) < MIN_VELOCITY) {
        velocityY = 0;
    }

    dodecahedron
        .css('-webkit-transform', 'rotateX(' + angleY +'deg) rotateY(' + -angleX + 'deg)')
        .css('-moz-transform', 'rotateX(' + angleY +'deg) rotateY(' + -angleX + 'deg)')
        .css('transform', 'rotateX(' + angleY +'deg) rotateY(' + -angleX + 'deg)');

    setTimeout(draw, MS_BTW_UPD);
};
