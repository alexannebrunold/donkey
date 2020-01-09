
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
var jumpList2 = [30,
  30,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
  20,
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
  -30];
var value;

x = 120;
y = 120;
x_obst = 1268;
x_ptn = 1268;
speed = 0;

x_fg1 = 0;
w_fg1 = 1286;

x_fg2 = 1286;
w_fg2 = 1400;

x_bg1 = 0;
w_bg1 = 1286;

x_bg2 = 1286;
w_bg2 = 1422;

isJumping = false;
let doGameInterval;

function resetValues() {
  isJumping = false;
  posJumping = 0;
  jumpList = [40, 30, 30, 20, 20, 10, 10, 10, -10, -10, -10, -20, -20, -30, -30, -40];
  value = 0;
  x = 120;
  y = 120;
  x_obst = 1286;

  x_fg1 = 0;
  w_fg1 = 1286;

  x_fg2 = 1286;
  w_fg2 = 1400;

  x_bg1 = 0;
  w_bg1 = 1286;

  x_bg2 = 1286;
  w_bg2 = 1422;

  x_gr1 = 0;
  w_gr1 = 1286;

  x_gr2 = 1286;
  w_gr2 = 1286;

  interval_ms = 50;
}



// ENTER GAME
oxo.inputs.listenKeyOnce("enter", function startGame() {
  resetValues();

  reduceInterval = setInterval(function () {
    interval_ms -= 0.2;
  }, 500)

  oxo.screens.loadScreen("game", function () {
    var character = document.querySelector(".player");
    var ennemy = document.querySelector(".obstacle1");
    var affichageScore = document.querySelector(".affichageScore");
    potion = document.querySelector(".potion");

    /// TRUCS QUI BOUGENT ///

    function name() {
      var obst = document.querySelector('.obstacle1');
      x_obst -= 10;
      obst.style.left = x_obst + "px";
      if (x_obst <= -20) {
        value++;
        x_obst = 1268;
      }

      var ground1 = document.querySelector('.ground-1');
      var ground2 = document.querySelector('.ground-2');

      x_gr1 -= 7;
      x_gr2 -= 7;
      ground1.style.left = x_gr1 + "px";
      ground2.style.left = x_gr2 + "px";
      if (x_gr1 <= -1286) {
        x_gr1 = x_gr2 + w_gr2;
      }
      if (x_gr2 <= -1286) {
        x_gr2 = x_gr1 + w_gr1;
      }

      var foreground1 = document.querySelector('.foreground-1');
      var foreground2 = document.querySelector('.foreground-2');

      x_fg1 -= 7;
      x_fg2 -= 7;
      foreground1.style.left = x_fg1 + "px";
      foreground2.style.left = x_fg2 + "px";
      if (x_fg1 <= -1286) {
        x_fg1 = x_fg2 + w_fg2;
      }
      if (x_fg2 <= -1400) {
        x_fg2 = x_fg1 + w_fg1;
      }

      var background1 = document.querySelector('.background-1');
      var background2 = document.querySelector('.background-2');

      x_bg1 -= 3;
      x_bg2 -= 3;
      background1.style.left = x_bg1 + "px";
      background2.style.left = x_bg2 + "px";
      if (x_bg1 <= -1286) {
        x_bg1 = x_bg2 + w_bg2;
      }
      if (x_bg2 <= -1400) {
        x_bg2 = x_bg1 + w_bg1;
      }
      setTimeout(name, interval_ms);
    }

    name()

    /// NE PAS TOUCHER ///

    doGameInterval = setInterval(function doGame() {
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

      var inGameScore = document.querySelector(".affichageScore__game");
      inGameScore.innerHTML = value;
      affichageScore.innerHTML = value;

    }, interval_ms);

    //Collision
    oxo.elements.onCollisionWithElement(character, potion, function () {
      potion.classList.add("disapear");
      var r = jumpList;
      jumpList = jumpList2;
      jumpList2 = r;
      console.log(jumpList, jumpList2);

    });

    setInterval(function () {
      oxo.elements.createElement({
        type: "div",
        class: "potion",
        appendTo: ".background"
      })
      x_ptn -= 10;
      potion.style.left = x_ptn + "px";
    }, 50)

    oxo.elements.onCollisionWithElement(character, ennemy, function dead() {
      oxo.screens.loadScreen("end", function () {
        clearInterval(doGameInterval);
        clearInterval(reduceInterval)
        var affichageScore = document.querySelector('.affichageScore');
        affichageScore.innerHTML = "Score : " + value;
        var rejouer = document.querySelector(".end__btn");
        rejouer.addEventListener("click", function () {
          clearInterval(doGameInterval);
          clearInterval(reduceInterval);
          startGame()
        });
        //Click go to home page
        var home = document.querySelector(".end__btn--home");
        home.addEventListener("click", function () {
          oxo.screens.loadScreen("home", function () { });
          clearInterval(doGameInterval);
          clearInterval(reduceInterval);
        });

      });
    });
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
  //d.style.left = x_player + "px";
  d.style.bottom = y_player + "px";
}

oxo.screens.loadScreen("home", function () {
  var btnHowToPlay = document.getElementById("btnHowToPlay");
  var instructions = document.getElementById("instructions");
  var instructionsClose = document.getElementById("close");

  var ptn = document.querySelector('.potion');
  x_ptn -= 5 * speed;
  ptn.style.left = x_ptn + "px";
  speed += 0.005;
  if (x_ptn <= -20) {
    x_ptn = 1268;
  }
  var obst = document.querySelector('.obstacle1');
  x_obst -= 10 * speed;
  obst.style.left = x_obst + "px";
  if (x_obst <= -20) {
    x_obst = 1268;
  }
  // Parallax
  var foreground1 = document.querySelector('.foreground-1');
  var foreground2 = document.querySelector('.foreground-2');

  btnHowToPlay.addEventListener("click", function () {
    instructions.classList.toggle("is-open");
  });


  instructionsClose.addEventListener("click", function () {
    instructions.classList.remove("is-open");
  });

});

//Tir
x_obst -= 10 * speed;
obst.style.left = x_obst + "px";
speed += 0.005;
if (x_obst <= -20) {
  x_obst = 1268;
  obst.classList.remove("destroyed");


  oxo.inputs.listenKey("right", function () {
    let ball = oxo.elements.createElement({
      class: "ball",
      appendTo: ".background"
    });


    oxo.elements.onLeaveScreenOnce(ball, function () {
      ball.remove();
    });

    oxo.elements.onCollisionWithElementOnce(ball, obst, function () {
      obst.classList.add("destroyed");
    });
  }, 50);
};