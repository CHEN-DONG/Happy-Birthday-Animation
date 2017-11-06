require("../styles/main.css");
let backAudioSrc = require("../assets/831143.mp3");
let loadingImg = require("../assets/loadingCat.gif")
import Typed from 'typed.js';
import anime from 'animejs';

const width = window.innerWidth;
const height = window.innerHeight;
const ctx = document.getElementById('heart-back').getContext('2d');
const colors = ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"];
let hearts = [];
window.onload = function () {
  let velas = document.getElementById('velas');
  velas.addEventListener("webkitAnimationEnd", cakeEndFunction);
  velas.addEventListener("animationend", cakeEndFunction);
  loadResource(function () {
    document.getElementById('back-music').src = "../assets/831143.mp3";
    document.getElementById('container').style = 'block';
    document.getElementById('first-page').style = 'block';
    audioAutoPlay('back-music');
    hideLoading();
  });
}

document.getElementById('go-on').onclick = function(){
  document.getElementById('first-page').style.display = "none";
  document.getElementById('second-page').style.display = "block";
  initHeartWall();
  startTypeWord();
  // anime({
  //   targets: '#second-page',
  //   style: {display:"block"},
  //   duration: 10000,
  //   complete: function(anim) {
  //     initHeartWall();
  //     startTypeWord();
  //   }
  // });
}
function loadResource(callback) {
  let backAudio = new Audio(backAudioSrc);
  backAudio.onloadeddata = callback;
}

function cakeEndFunction() {
  let textDom = document.getElementById('text-content');

  var pathEls = textDom.querySelectorAll('path');
  let firstPageTimeline = anime.timeline();
  for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute('stroke-dashoffset', offset);
  }
  let ageObj = { age: 1 };
  firstPageTimeline
    .add({
      targets: '#age-content',
      opacity: 1,
      duration: 2000,
      easing: 'linear'
    })
    .add({
      targets: ageObj,
      age: 22,
      round: 1,
      duration: 3000,
      easing: 'linear',
      update: function () {
        var el = document.querySelector('#age-content p');
        el.innerHTML = ageObj.age;
      }
    })
    .add({
      targets: '#text-content',
      opacity: 1,
      duration: 200,
    })
    .add({
      targets: pathEls,
      strokeDashoffset: [offset, 0],
      duration: 3000,
      direction: 'alternate',
      easing: 'linear',
    })
    .add({
      targets: '#go-on',
      translateX: -200,
      duration: 2000,
    })

}

function startTypeWord() {

  let wrep = '<br>^50';
  // let myWords = `Hi! 力文：^1000
  // ${wrep}
  // ${wrep}
  // 好久都没见了
  // ${wrep}
  // ${wrep}
  // 生日快乐
  // I Love You`;

  let myWords = `好久都没见了,好久都没见了
  ${wrep}
  ${wrep}
  好久都没见了好久都没见了好久都没见了好久都没见了好久都没见了
  ${wrep}
  ${wrep}
  好久都没见了好久都没见了好久都没见了
  ${wrep}
  好久都没见了好久都没见了好久都没见了好久都没见了好久都没见了好久都没见了`;

  let options = {
    strings: [myWords],
    typeSpeed: 150,
    loop: true,
    callback: function () { }
  };

  var typed = new Typed("#mywords", options);
}

function initHeartWall() {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  let heartCount = 35;

  for (let i = 0; i < heartCount; i++) {
    let cntrX = anime.random(0, width);
    let cntrY = anime.random(height, height * 2);
    let vscale = anime.random(0.5, 2);
    let color = colors[anime.random(0, colors.length)];
    let heart = drawHeart(ctx, cntrX, cntrY, vscale, color);
    heart.draw();
    hearts.push(heart);
  }

  for (let i = 0; i < hearts.length; i++) {
    anime({
      targets: hearts[i],
      cntrY: function (p) { return p.cntrY - height; },
      update: function (anim) {
        for (var i = 0; i < anim.animatables.length; i++) {
          anim.animatables[i].target.draw();
        }
      },
      duration: anime.random(10000, 20000),
      loop: true,
    });
  }
}
anime({
  duration: Infinity,
  update: function () {
    ctx.clearRect(0, 0, width, height);
  }
});
function drawHeart(ctx, cntrX, cntrY, vscale, color) {
  let heart = {};
  let d = Math.PI / 180;
  heart.cntrX = cntrX;
  heart.cntrY = cntrY;
  heart.alpha = .8;
  heart.color = color;
  heart.draw = function () {
    ctx.beginPath();
    ctx.moveTo(cntrX, cntrY - getY(0) * vscale);
    for (let i = 0; i < 2 * Math.PI; i = i + d) {
      let x = getX(i) * vscale + heart.cntrX;
      let y = -getY(i) * vscale + heart.cntrY;
      ctx.lineTo(x, y);
    }
    ctx.fillStyle = heart.color;
    ctx.globalAlpha = heart.alpha;
    ctx.fill();
  }
  return heart
}

function getX(t) {
  return 16 * Math.pow(Math.sin(t), 3);
}

function getY(t) {
  return 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
}


function showLoading() {
  let loadEl = document.getElementById('loading');
  loadEl.style.display = 'block';
}

function hideLoading() {
  let loadEl = document.getElementById('loading');
  loadEl.style.display = 'none';
}
function audioAutoPlay(id) {
  var audio = document.getElementById(id),
    play = function () {
      audio.play();
      document.removeEventListener("touchstart", play, false);
    };
  audio.play();
  document.addEventListener("WeixinJSBridgeReady", function () {
    play();
  }, false);
  document.addEventListener('YixinJSBridgeReady', function () {
    play();
  }, false);
  document.addEventListener("touchstart", play, false);
}

window.addEventListener('resize', initHeartWall);



// document.addEventListener(('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown', function(e) {
//   let cntrX = e.clientX || e.touches[0].clientX;
//   let cntrY = e.clientY || e.touches[0].clientY;
// }, false);