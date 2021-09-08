const payday = new Audio('./sfx/payday.mp3');
const eveeSound = new Audio('./sfx/evee.mp3');
const victory = new Audio('./sfx/victory.mp3');
const musicBattle = new Audio('./sfx/battle.mp3');
const pikachuSound = new Audio('./sfx/pikachu.mp3');
const tackleSound = new Audio('./sfx/tackle.wav');
const menuSelect = document.querySelector('.menu-select').children;
const selectAttack = document.querySelectorAll('.menu-attack > span');
musicBattle.play();
musicBattle.loop = true;
//TYPING WRITE
const typing = ((str) => {
  let split = str.split("");
  let counter = 0;
  let loadWrite = setInterval(() => {
    let write = $(".write");
    write.append(split[counter]);
    counter++;
    if (counter === str.length) {
      clearInterval(loadWrite);
    }
  }, 20);
});
//HIDDEN
$('.balls').hide();
$('.write').text('');
$('.menu-select').hide();
$('.menu-attack').hide();
$('.foe .status').hide();
$('.trainer .status').hide();
//FOE DATA
const foe = 'Gary';
const foeLevel = 5;
const foePokemon = {
  'name': 'Eevee',
  'hp': 40,
  'atk': 55,
  'def': 50
};
const hpFoeFull = foePokemon.hp;
let hpFoe = hpFoeFull;
$('.foe .name').text(`${foePokemon.name.toUpperCase()}`);
$('.foe .level').text(`${foeLevel}`);
//TRAINER DATA
const player = 'Ash';
const playerLevel = 5;
const playerPokemon = {
  'name': 'Pikachu',
  'hp': 35,
  'atk': 70,
  'def': 30,
  'tackle': 35,
  'tailwhip': 25
};
const hpPlayerTotal = playerPokemon.hp;
let hpPlayer = hpPlayerTotal;
$('.trainer .name').text(`${playerPokemon.name.toUpperCase()}`);
$('.trainer .level').text(`${playerLevel}`);
//HEALTH BAR CALCULATOR AND HEALTH NUMBERS
const healthbar = (current, total) => {
  const hpCurrent = current;
  const hpTotal = total;
  const percentTotal = 100;
  const percentCurrent = hpCurrent * percentTotal / hpTotal;
  return percentCurrent;
};
let num = -60;
const foeCharacter = setInterval(() => {
  if (num == 60) {
    clearInterval(foeCharacter);
    $('.balls').show();
    payday.play();
    window.setTimeout(() => {
      //GARY OUT
      typing(`${foe.toUpperCase()} wants \nto fight¡`);
      window.setTimeout(() => {
        $('.balls').hide();
        $('.foe .character').animate({
          left: '100%'
        }, 300, 'linear');
        $('.write').text('');
        //EEVEE SHOW
        window.setTimeout(() => {
          typing(`${foe.toUpperCase()} sent \nout ${foePokemon.name.toUpperCase()}¡`);
          $('.foe .pokemon').animate({
            left: '60%'
          }, 300, 'linear');
          eveeSound.play();
          trainerCharacter();
        }, 1000);
      }, 2000);
    }, 300);
  } else {
    num++;
    $('.foe .character').css('left', `${num}%`);
    $('.trainer .character').css('right', `${num}%`);
  }
}, 14);
const trainerCharacter = () => {
  //ASH OUT
  window.setTimeout(() => {
    $('.foe .status').show();
    $('.trainer .character').animate({
      right: '100%'
    }, 300, 'linear');
    $('.write').text('');
    //SHOW PIKACHU
    window.setTimeout(() => {
      typing(`Go¡ ${playerPokemon.name.toUpperCase()}¡`);
      $('.trainer .status').show();
      $('.trainer .pokemon').animate({
        right: '60%'
      }, 300, 'linear');
      pikachuSound.play();
      window.setTimeout(() => {
        $('.write').text('');
        $('.menu-select').show();
        //SELECT MENU OPTION
        for (let i = 0; i < menuSelect.length; i++) {
          menuSelect[i].addEventListener('click', () => {
            if (i == 0) {
              $('.menu-attack').show();
            }
          });
          //SELECT ATTACK
          selectAttack[i].addEventListener("click", () => {
            if (i == 0) {
              tackle();
            } else {
              $('.menu-attack').hide();
            }
            if (i == 1) {
              console.log('Tail-Whip');
            }
          });
          //INFO ATTACK
          selectAttack[i].addEventListener("mousemove", () => {
            if (i == 0) {
              $('.type .point-attack').text(`${playerPokemon.tackle}/35`);
            }
            if (i == 1) {
              $('.type .point-attack').text(`${playerPokemon.tailwhip}/25`);
            }
          });
        }
      }, 1500);
    }, 1000);
  }, 2000);
};
const tackle = () => {
  playerPokemon.tackle -= 1;
  $('.type .point-attack').text(`${playerPokemon.tackle}/35`);
  if (playerPokemon.tackle !== 0 || hpPlayer !== 0) {
    $('.menu-select').hide();
    $('.menu-attack').hide();
    typing(`${playerPokemon.name.toUpperCase()} used \nTACKLE¡`);
    $('.trainer .pokemon img').animate({
      left: '0'
    }, 100, 'linear').animate({
      left: '18px'
    }, 50, 'linear').delay(100).animate({
      left: '8px'
    }, 10, 'linear');
    tackleSound.play();
    window.setTimeout(() => {
      $('.foe .pokemon img').css('opacity', 0);
      window.setTimeout(() => {
        $('.foe .pokemon img').css('opacity', 1);
        window.setTimeout(() => {
          $('.foe .pokemon img').css('opacity', 0);
          window.setTimeout(() => {
            $('.foe .pokemon img').css('opacity', 1);
            window.setTimeout(() => {
              $('.foe .pokemon img').css('opacity', 0);
              window.setTimeout(() => {
                $('.foe .pokemon img').css('opacity', 1);
                window.setTimeout(() => {
                  const basePower = 65;
                  const baseDamage = Math.floor(Math.floor(Math.floor(2 * playerLevel / 5 + 2) * basePower * playerPokemon.atk / foePokemon.def) / 50) + 2;
                  hpFoe -= baseDamage;
                  $('.foe .hp-bar-active').animate({
                    width: `${healthbar(hpFoe, hpFoeFull)}%`
                  }, 300, 'linear');
                  $('.foe .status .hp-bar').animate({
                    top: '1px'
                  }, 160, 'linear').animate({
                    top: '-1px'
                  }, 160, 'linear');
                  window.setTimeout(() => {
                    if (hpFoe < 0) {
                      hpFoe = 0;
                    }
                    if (hpFoe == 0) {
                      window.setTimeout(() => {
                        typing(`${foePokemon.name.toUpperCase()} fainted!`);
                        $('.foe .pokemon img').animate({
                          top: '100px'
                        }, 300);
                        musicBattle.pause();
                        eveeSound.play();
                        victory.play();
                        window.setTimeout(() => {
                          $('.write').text('');
                          $('.foe .character').animate({
                            left: '60%'
                          }, 300, 'linear');
                          window.setTimeout(() => {
                            typing(`Got $${Math.floor(playerLevel * 2.5)} for\nwinning!`);
                            window.setTimeout(() => {
                              $('.write').text('');
                              typing(`${foe.toUpperCase()}: I can't\nbelieve it!`);
                              window.setTimeout(() => {
                                $('.write').text('');
                                typing('I chose the\nwrong POKéMON!');
                              }, 1000);
                            }, 1000);
                          }, 1000);
                        }, 1000);
                      }, 100);
                    }
                    foeTackle();
                  }, 1000)
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }
};
//SELECT ATTACK RAMDOM
//let foeAttack = Math.floor((Math.random() * 2));
const foeTackle = () => {
  $('.write').text('');
  if (hpFoe !== 0) {
    $('.foe .pokemon img').animate({
      right: '0'
    }, 100, 'linear').animate({
      right: '18px'
    }, 50, 'linear').delay(100).animate({
      right: '8px'
    }, 10, 'linear');
    typing(`${foePokemon.name.toUpperCase()} used \nTACKLE¡`);
    tackleSound.play();
    window.setTimeout(() => {
      $('.trainer .pokemon img').css('opacity', 0);
      window.setTimeout(() => {
        $('.trainer .pokemon img').css('opacity', 1);
        window.setTimeout(() => {
          $('.trainer .pokemon img').css('opacity', 0);
          window.setTimeout(() => {
            $('.trainer .pokemon img').css('opacity', 1);
            window.setTimeout(() => {
              $('.trainer .pokemon img').css('opacity', 0);
              window.setTimeout(() => {
                $('.trainer .pokemon img').css('opacity', 1);
                window.setTimeout(() => {
                  $('.menu-select').show();
                  const basePower = 40;
                  const baseDamage = Math.floor(Math.floor(Math.floor(2 * playerLevel / 5 + 2) * basePower * foePokemon.atk / playerPokemon.def) / 50) + 2;
                  hpPlayer -= baseDamage;
                  $('.trainer .hp-point .point').text(hpPlayer);
                  $('.trainer .hp-bar-active').animate({
                    width: `${healthbar(hpPlayer, hpPlayerTotal)}%`
                  }, 300, 'linear');
                  $('.trainer .status .hp-bar').animate({
                    top: '1px'
                  }, 160, 'linear').animate({
                    top: '-1px'
                  }, 160, 'linear');
                  if (hpPlayer < 0) {
                    hpPlayer = 0;
                  }
                  if (hpPlayer == 0) {
                    $('.trainer .pokemon img').animate({
                      top: '100px'
                    }, 300);
                    pikachuSound.play();
                  }
                  $('.write').text('');
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }
};