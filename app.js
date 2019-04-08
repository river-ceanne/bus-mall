'use strict';

var imageView = document.getElementById('image-selection');
console.log(imageView);
var images = [];
var clickTries = 25;
var imagesPrev = [];
var imagesPrevPrev = [];

function randomImage(){
  var randNum = Math.floor(Math.random() * (images.length - 0 + 1));

  console.log(randNum);
  return randNum;
}

function showImagesOnView(){
  var random = randomImage();
  images[random].render();

}

//////IMAGES CONSTRUCTOR FUNCTION////////

function Image(filepath,id,views,clicks){
  this.filepath = 'img/' + filepath;
  console.log(this.filepath);
  this.id = id;
  this.views = views;
  this.clicks = clicks;
  images.push(this);
}

Image.prototype.render = function(){
  var imgEl = document.createElement('img');
  imgEl.id = this.id;
  imgEl.height = 300;
  imgEl.src = this.filepath;
  imageView.appendChild(imgEl);
};

//////MAIN CALLS//////////

new Image('bag.jpg','bag',0,0);
new Image('banana.jpg','banana',0,0);
new Image('bathroom.jpg','bathroom',0,0);
new Image('boots.jpg','boots',0,0);
new Image('breakfast.jpg','breakfast',0,0);
new Image('bubblegum.jpg','bubblegum',0,0);
new Image('chair.jpg','chair',0,0);
new Image('cthulhu.jpg','cthulhu',0,0);
new Image('dog-duck.jpg','dog-duck',0,0);
new Image('dragon.jpg','dragon',0,0);
new Image('pen.jpg','pen',0,0);
new Image('pet-sweep.jpg','pet-sweep',0,0);
new Image('scissors.jpg','scissors',0,0);
new Image('shark.jpg','shark',0,0);
new Image('sweep.jpg','sweep',0,0);
new Image('tauntaun.jpg','tauntaun',0,0);
new Image('unicorn.jpg','unicorn',0,0);
new Image('usb.jpg','usb',0,0);
new Image('water-can.jpg','water-can',0,0);
new Image('wine-glass.jpg','wine-glass',0,0);

console.log('Length of Images Array: ' + images.length);
randomImage();
showImagesOnView();
