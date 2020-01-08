var isJumping = false;
var posJumping = 0;
var jumpList = [44, 22, 11, 11, -11, -11, -22, -44];
x = 120;
y = 120;
x_obst = 1268;

oxo.inputs.listenKeyOnce("enter", function () {
  oxo.screens.loadScreen("game", function () {
    var character = document.querySelector('.player');
    var ennemy = document.querySelector('.obstacle1');

    setInterval(function doGame() {
      if (isJumping) {
        vplayer = document.querySelector(".player");
        ecart = jumpList[posJumping];
        y += ecart;
        placePlayer(x, y);
        posJumping++;
        if (posJumping == jumpList.length) {
          isJumping = false;
          posJumping = 0;
        }
      }
      x_obst -= 10;
      ennemy.style.left = x_obst + "px";
    }, 50);

    //Collision
    oxo.elements.onCollisionWithElement(character, ennemy, function () {
      oxo.screens.loadScreen("end");
    });
  });

  oxo.inputs.listenKey("space", function () {
    if (oxo.screens.getCurrentScreen() == "game") {
      if (!isJumping) {
        isJumping = true;
      }
    }
  });

  function placePlayer(x_player, y_player) {
    var d = document.querySelector(".player");
    d.style.position = "absolute";
    d.style.left = x_player + "px";
    d.style.bottom = y_player + "px";
  }


});



