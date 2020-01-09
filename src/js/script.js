var isJumping = false;
var posJumping = 0;
var jumpList = [
  60,
  60,
  30,
  30,
  15,
  15,
  15,
  15,
  -15,
  -15,
  -15,
  -15,
  -30,
  -30,
  -60,
  -60
];
var value;
x = 120;
y = 120;
x_obst = 1268;
speed = 0;
let obst;

oxo.inputs.listenKeyOnce("enter", function() {
  oxo.screens.loadScreen("game", function() {
    var character = document.querySelector(".player");
    var ennemy = document.querySelector(".obstacle1");
    var affichageScore = document.querySelector(".affichageScore");
    obst = document.querySelector(".obstacle1");

    //Score
    value = 0;
    setInterval(function() {
      value++;
    }, 1000);

    affichageScore.innerHTML = value;

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
    oxo.elements.onCollisionWithElement(character, ennemy, function() {
      if (!obst.classList.contains("destroyed")) {
        oxo.screens.loadScreen("end", function() {
          var affichageScore = document.querySelector(".affichageScore");
          affichageScore.innerHTML = value;
        });
      }
    });
  });

  oxo.inputs.listenKey("space", function() {
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
    x_obst -= 10 * speed;
    obst.style.left = x_obst + "px";
    speed += 0.005;
    if (x_obst <= -20) {
      x_obst = 1268;
      obst.classList.remove("destroyed");
    }

    oxo.inputs.listenKey("enter", function() {
      let ball = oxo.elements.createElement({
        class: "ball",
        appendTo: ".background"
      });

      oxo.elements.onLeaveScreenOnce(ball, function() {
        ball.remove();
      });

      oxo.elements.onCollisionWithElementOnce(ball, obst, function() {
        obst.classList.add("destroyed");
      });
    });
  }, 50);
});
