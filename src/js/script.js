var isJumping = false;
var posJumping = 0;
var jumpList = [
  30,
  30,
  20,
  20,
  20,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -10,
  -20,
  -20,
  -20,
  -30,
  -30
];
var value;
x = 120;
y = 120;
x_obst = 1268;
speed = 0;

x_fg1 = 0;
w_fg1 = 1286;

x_fg2 = 1286;
w_fg2 = 1400;

x_bg1 = 0;
w_bg1 = 1286;

x_bg2 = 1286;
w_bg2 = 1422;

// ENTER GAME
oxo.inputs.listenKeyOnce("enter", function() {
  oxo.screens.loadScreen("game", function() {
    var character = document.querySelector(".player");
    var ennemy = document.querySelector(".obstacle1");
    var affichageScore = document.querySelector(".affichageScore");

    //Score
    value = 0;
    setInterval(function() {
      value++;
      var inGameScore = document.querySelector(".affichageScore__game");
      inGameScore.innerHTML = value;
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
      oxo.screens.loadScreen("end", function() {
        var affichageScore = document.querySelector(".affichageScore");
        affichageScore.innerHTML = value;
      });
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
    var obst = document.querySelector(".obstacle1");
    x_obst -= 10 * speed;
    obst.style.left = x_obst + "px";
    if (x_obst <= -20) {
      x_obst = 1268;
    }
    // Parallax
    var foreground1 = document.querySelector(".foreground-1");
    var foreground2 = document.querySelector(".foreground-2");

    x_fg1 -= 7 * speed;
    x_fg2 -= 7 * speed;
    foreground1.style.left = x_fg1 + "px";
    foreground2.style.left = x_fg2 + "px";
    if (x_fg1 <= -1286) {
      x_fg1 = x_fg2 + w_fg2;
    }
    if (x_fg2 <= -1400) {
      x_fg2 = x_fg1 + w_fg1;
    }

    var background1 = document.querySelector(".background-1");
    var background2 = document.querySelector(".background-2");

    x_bg1 -= 3 * speed;
    x_bg2 -= 3 * speed;
    background1.style.left = x_bg1 + "px";
    background2.style.left = x_bg2 + "px";
    if (x_bg1 <= -1286) {
      x_bg1 = x_bg2 + w_bg2;
    }
    if (x_bg2 <= -1400) {
      x_bg2 = x_bg1 + w_bg1;
    }
    speed += 0.005;
  }, 50);
});

oxo.screens.loadScreen("home", function() {
  var btnHowToPlay = document.getElementById("btnHowToPlay");
  var instructions = document.getElementById("instructions");

  btnHowToPlay.addEventListener("click", function() {
    instructions.classList.toggle("is-open");
    console.log("hello");
  });
});
