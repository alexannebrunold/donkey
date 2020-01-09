isJumping = false;
let doGameInterval;

function resetValues() {
  isJumping = false;
  posJumping = 0;
  jumpList = [40,30,30,20,20,10,10,10,-10,-10,-10,-20,-20,-30,-30,-40];
  value = 0;
  x = 250;
  y = 120;
  x_obst = 1268;

  x_fg1 = 0;
  w_fg1 = 1286;

  x_fg2 = 1286;
  w_fg2 = 1400;

  x_bg1 = 0;
  w_bg1 = 1286;

  x_bg2 = 1286;
  w_bg2 = 1422;

  interval_ms = 50;
}


// ENTER GAME
oxo.inputs.listenKeyOnce("enter", function startGame() {
  resetValues();

  reduceInterval = setInterval(function() {
    interval_ms -= 0.5;
  },500)

  oxo.screens.loadScreen("game", function() {
    var character = document.querySelector(".player");
    var ennemy = document.querySelector(".obstacle1");
    var affichageScore = document.querySelector(".affichageScore");

    /// TRUCS QUI BOUGENT ///

    function name() {
      var obst = document.querySelector('.obstacle1');
        x_obst -= 10;
        obst.style.left = x_obst + "px";
        if (x_obst <= -20) {
          value++;
          x_obst = 1268;
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
  d.style.left = x_player + "px";
  d.style.bottom = y_player + "px";
}

oxo.screens.loadScreen("home", function() {
  var btnHowToPlay = document.getElementById("btnHowToPlay");
  var instructions = document.getElementById("instructions");
  var instructionsClose = document.getElementById("close");

  btnHowToPlay.addEventListener("click", function() {
    instructions.classList.toggle("is-open");
  });
  
  instructionsClose.addEventListener("click", function() {
    instructions.classList.remove("is-open");
  });
  
});