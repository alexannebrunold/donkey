
var isJumping = false;
var posJumping = 0;
var jumpList = [44,22,11,11,-11,-11,-22,-44];
x = 120;
y = 120;

oxo.inputs.listenKeyOnce('enter', function() {
    oxo.screens.loadScreen('game');
});


oxo.inputs.listenKey('space', function() {
    if (oxo.screens.getCurrentScreen() == 'game') {
        if (!isJumping) {
            console.log(vobstacle1.left);
            isJumping = true;
        }
    }
});


function placeDiv(x_pos, y_pos) {
    var d = document.querySelector('.player');
    d.style.position = "absolute";
    d.style.left = x_pos + 'px';
    d.style.bottom = y_pos + 'px';
}

setInterval(function doGame() {
    if (isJumping) {
        vplayer = document.querySelector('.player');
        ecart = jumpList[posJumping];
        y += ecart;
        placeDiv(x, y);
        posJumping++;
        if (posJumping == jumpList.length) {
            isJumping = false;
            posJumping = 0;
        }
    }
    vobstacle1 = document.querySelector('.obstacle1');
    //vobstacle
}, 50);

